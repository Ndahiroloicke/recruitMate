import type { SupabaseClient } from '@supabase/supabase-js'
import type { MultiPartData } from 'h3'
import type { Database, Tables } from '../types/supabase'
import mammoth from 'mammoth'

import { getDocument } from 'pdfjs-dist'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import * as XLSX from 'xlsx/xlsx.mjs'
import { parseCandidateResume } from './ai'

interface ContactInformation {
    email: string
    phone: string
}

interface EducationItem {
    degree: string
    institution: string
    years: string
}

interface WorkExperienceItem {
    'job title': string
    'company': string
    'years': string
}

export interface ParsedData {
    isValid: boolean
    Name?: string
    'Contact Information'?: ContactInformation
    'Education'?: EducationItem[]
    'Work Experience'?: WorkExperienceItem[]
    'Skills'?: string[]
    'Certifications'?: string[]
    'Summary'?: string
    'Trait Personality'?: string[]
    'Slogan'?: string
    'Personal Info'?: string[]
}

// Add polyfill at the top of the file
if (typeof Promise.withResolvers === 'undefined') {
    Promise.withResolvers = function <T>() {
        let resolve!: (value: T | PromiseLike<T>) => void;
        let reject!: (reason?: any) => void;
        const promise = new Promise<T>((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve, reject };
    };
}

async function extractTextFromBinaryDocx(fileBuffer: ArrayBuffer) {
    try {
        // eslint-disable-next-line node/prefer-global/buffer
        const buffer = Buffer.from(fileBuffer)
        const { value: text } = await mammoth.extractRawText({ buffer })
        return text
    }
    catch (error) {
        console.error('Error extracting text:', error)
        return ''
    }
}

async function extractTextFromBinaryPdf(fileBuffer: ArrayBuffer) {
    try {
        const loadingTask = getDocument({
            data: fileBuffer,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
            disableFontFace: true,
            disableRange: true,
            disableStream: true,
            disableAutoFetch: true
        })
        
        const pdfDocument = await loadingTask.promise
        let fullText = ''

        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum)
            const content = await page.getTextContent()
            const pageText = content.items
                .map((item: any) => item.str)
                .join(' ')
            fullText += `${pageText}\n`
        }

        return fullText
    }
    catch (error) {
        console.error('Error extracting text from PDF:', error)
        return ''
    }
}

async function extractTextFromBinaryXlsx(fileBuffer: ArrayBuffer) {
    try {
        // eslint-disable-next-line node/prefer-global/buffer
        const buffer = Buffer.from(fileBuffer)
        const workbook = XLSX.read(buffer, { type: 'buffer' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const csvData = XLSX.utils.sheet_to_csv(worksheet)
        return csvData
    }
    catch (error) {
        console.error('Error extracting text from XLSX:', error)
        return ''
    }
}

async function parseWithRetry(text: string, maxRetries = 3, delay = 1000): Promise<string | null> {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await parseCandidateResume(text)
            if (response) {
                return response
            }
            // If no response but no error, try again
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay))
                continue
            }
        } catch (error) {
            console.error(`AI parsing attempt ${i + 1} failed:`, error)
            if (i === maxRetries - 1) throw error
            await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
        }
    }
    return null
}

export async function parseFileResume({ file }: { file: MultiPartData }): Promise<ParsedData> {
    try {
        if (!file.data) {
            throw new Error('No file data provided')
        }

        let resumeText = ''
        const fileBuffer = Buffer.from(file.data).buffer as ArrayBuffer

        // Process file based on type
        if (file.filename?.toLowerCase().endsWith('.pdf')) {
            resumeText = await extractTextFromBinaryPdf(fileBuffer)
        } else if (file.filename?.toLowerCase().endsWith('.docx')) {
            resumeText = await extractTextFromBinaryDocx(fileBuffer)
        } else if (file.filename?.toLowerCase().endsWith('.xlsx')) {
            resumeText = await extractTextFromBinaryXlsx(fileBuffer)
        } else {
            throw new Error('Unsupported file type')
        }

        if (!resumeText) {
            return { isValid: false }
        }

        const resumeAIResponse = await parseWithRetry(resumeText)
        if (!resumeAIResponse) {
            return { isValid: false }
        }

        const parsedData: ParsedData = JSON.parse(resumeAIResponse)
        const isValid = !!(parsedData.Name && parsedData['Contact Information'])

        return {
            ...parsedData,
            isValid,
        }
    } catch (error) {
        console.error('Error in parseFileResume:', error)
        return { isValid: false }
    }
}

export async function parseResume({
    candidate,
    supabase,
    force = false,
}: {
    candidate: Tables<'candidates'>
    supabase: SupabaseClient<Database>
    force?: boolean
}) {
    if (!candidate.resume) {
        return null
    }

    if (candidate.resume_content && !force) {
        return candidate
    }

    const { data, error } = await supabase.storage
        .from('resumes')
        .download(candidate.resume)

    if (error || !data) {
        return null
    }

    const fileBuffer = await data.arrayBuffer()
    let resumeText = ''

    if (candidate.resume.endsWith('.pdf')) {
        resumeText = await extractTextFromBinaryPdf(fileBuffer)
    }
    else if (candidate.resume.endsWith('.docx')) {
        resumeText = await extractTextFromBinaryDocx(fileBuffer)
    }
    else if (candidate.resume.endsWith('.xlsx')) {
        resumeText = await extractTextFromBinaryXlsx(fileBuffer)
    }
    else {
        console.warn('Unsupported file extension')
        return null
    }

    if (!resumeText) {
        return null
    }

    const resumeAIResponse = await parseCandidateResume(resumeText)

    if (!resumeAIResponse) {
        return null
    }

    const parsedData: ParsedData = JSON.parse(resumeAIResponse)

    const updateBody: Record<string, any> = {
        resume_content: parsedData,
    }

    if (!candidate.first_name && parsedData?.Name) {
        const [firstName, ...rest] = parsedData.Name.split(' ')
        updateBody.first_name = firstName
        updateBody.last_name = rest.join(' ')
    }

    if (!candidate.email && parsedData?.['Contact Information']?.email) {
        updateBody.email = parsedData['Contact Information'].email
    }

    if (!candidate.phone && parsedData?.['Contact Information']?.phone) {
        updateBody.phone = parsedData['Contact Information'].phone
    }

    const { data: updatedCandidate, error: updateError } = await supabase
        .from('candidates')
        .update(updateBody)
        .eq('id', candidate.id)
        .select('*')
        .single()

    if (updateError) {
        throw updateError
    }

    return updatedCandidate
}
