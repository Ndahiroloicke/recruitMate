import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export function candidateResumePrompt(resumeText: string) {
    return `
You are an expert ATS (Applicant Tracking System) parser. Your task is to extract structured information from the resume text with high precision. You must return valid JSON data following this exact structure:

{
    "Name": "Full Name",
    "Contact Information": {
        "email": "email@example.com",
        "phone": "phone number"
    },
    "Education": [{
        "degree": "Degree Name",
        "institution": "Institution Name",
        "years": "Year Range"
    }],
    "Work Experience": [{
        "job title": "Position",
        "company": "Company Name",
        "years": "Year Range"
    }],
    "Skills": ["skill1", "skill2"],
    "Certifications": ["cert1", "cert2"],
    "Summary": "brief description",
    "Trait Personality": ["trait1", "trait2"],
    "Slogan": "professional motto if any",
    "Personal Info": ["detail1", "detail2"]
}

Important:
1. Always attempt to extract the Name field
2. Ensure Contact Information contains either email or phone
3. Format dates consistently as "YYYY - YYYY" or "YYYY - Present"
4. If a field is empty, include it with an empty array or null
5. Do not skip any fields from the structure

Resume Text to Parse:
${resumeText}
`
}

export function emailPrompt(
    emailSubject: string,
    emailBody: string,
    candidateInformation: string,
) {
    return `
You are a email writing assistant. I will provide you an email template with subject and body, and candidate information. Please write an email to the candidate based on the email template and resume.
Make sure to personalize the email to the candidate. Use a tone that is professional yet friendly. Make sure to include the candidate's background and skills in the email.
Please return only the subject and body of the email in JSON format without any extra explanations.

Email Subject:
${emailSubject}

Email Template:
${emailBody}

Candidate Information In Json Format:
${candidateInformation}
`
}

export async function parseCandidateResume(resumeText: string) {
    const prompt = candidateResumePrompt(resumeText)

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-mini',
    })

    if (!chatCompletion.choices[0].message.content) {
        throw createError({
            status: 500,
            statusMessage: 'Error parsing resume',
        })
    }

    return stripJsonBlock(chatCompletion.choices[0].message.content as string)
}

export async function personalizeEmail(
    emailSubject: string,
    emailBody: string,
    candidateInformation: string,
) {
    const prompt = emailPrompt(emailSubject, emailBody, candidateInformation)

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o',
    })

    if (!chatCompletion.choices[0].message.content) {
        throw createError({
            status: 500,
            statusMessage: 'Error generating email',
        })
    }

    return stripJsonBlock(chatCompletion.choices[0].message.content as string)
}

export async function generateEmailTemplate(
    company_name: string,
    campaign_name: string,
    campaign_description: string,
): Promise<{
        subject: string
        body: string
    }> {
    const prompt = `Generate a job hiring campaign email using these inputs:
- company_name: ${company_name}
- campaign_name: ${campaign_name}
- campaign_description: ${campaign_description}
The email should:
- Feature an enticing subject line.
- Provide a Rich Text Editor content that highlights the opportunity, aligns with the campaign's description, and encourages candidates to take the next step.
Output the result in JSON format:
- Add line breaks and paragraphs properly, don't use em and highlight the company name
{
  "subject": string,
  "body": string
}
The style should be professional, concise, and persuasive.`

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-mini',
    })

    if (!chatCompletion.choices[0].message.content) {
        throw createError({
            status: 500,
            statusMessage: 'Error generating email',
        })
    }

    return parseOpenAIJsonResponse(chatCompletion.choices[0].message.content)
}

export async function createEmailTemplate(
    companyName: string,
    jobPosition: string,
) {
    const prompt = `Create an email template to find a candidate for the position of ${jobPosition} at ${companyName}. Include both the subject line and the body of the email.`

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-mini',
    })

    if (!chatCompletion.choices[0].message.content) {
        throw createError({
            status: 500,
            statusMessage: 'Error generating email template',
        })
    }

    const emailContent = chatCompletion.choices[0].message.content as string
    const [subjectLine, ...bodyLines] = emailContent.split('\n')
    const emailBody = bodyLines.join('\n').trim()

    return {
        subjectLine: subjectLine.replace('Subject:', '').trim(),
        emailBody,
    }
}

function stripJsonBlock(input: string): string {
    const jsonBlock = input.match(/```json([\s\S]*?)```/)
    if (jsonBlock && jsonBlock[1]) {
        return jsonBlock[1].trim()
    }
    return ''
}

function parseOpenAIJsonResponse(content: string): any {
    const jsonString = content
        ?.replace(/```json/g, '')
        ?.replace(/```/g, '')
        ?.trim()

    const extractedJson = JSON.parse(jsonString || '{}')

    return extractedJson
}
