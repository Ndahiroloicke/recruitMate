import { parseFileResume } from '../../../utils/parseResume'

async function tryParseWithRetry(file: any, maxRetries = 3): Promise<any> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await parseFileResume({ file })
            return result
        }
        catch (error) {
            console.error(`Parse attempt ${attempt} failed:`, error)
            if (attempt === maxRetries) {
                return null
            }

            await new Promise(resolve => setTimeout(resolve, attempt * 100))
        }
    }
    return null
}

export default defineEventHandler(async (event) => {
    try {
        const formData = await readMultipartFormData(event)
        if (!formData) {
            return createApiResponse(400, null, 'No file uploaded')
        }

        const fileFields = formData.filter(field => field.type && field.filename)
        
        // Reduce batch size and add delay between requests
        const BATCH_SIZE = 10 // Reduced from 50
        const parsedResumes = []
        
        // Process in smaller sequential batches
        for (let i = 0; i < fileFields.length; i += BATCH_SIZE) {
            const batch = fileFields.slice(i, i + BATCH_SIZE)
            
            // Process batch with delay between each file
            const batchResults = await Promise.all(
                batch.map(async (field, index) => {
                    // Add delay between each file in batch
                    await new Promise(resolve => setTimeout(resolve, index * 200))
                    
                    try {
                        const parsedCandidate = await tryParseWithRetry(field)
                        return {
                            content: {
                                ...parsedCandidate,
                                'Trait Personality': parsedCandidate?.['Trait Personality'] || [],
                                Skills: parsedCandidate?.Skills || [],
                                Certifications: parsedCandidate?.Certifications || [],
                                'Personal Info': parsedCandidate?.['Personal Info'] || [],
                                isValid: !!parsedCandidate?.isValid
                            },
                            filename: field.filename,
                        }
                    } catch (error) {
                        console.error(`Error processing ${field.filename}:`, error)
                        return {
                            content: { 
                                isValid: false,
                                'Trait Personality': [],
                                Skills: [],
                                Certifications: [],
                                'Personal Info': []
                            },
                            filename: field.filename,
                            error: error instanceof Error ? error.message : 'Unknown error'
                        }
                    }
                })
            )
            
            parsedResumes.push(...batchResults)
            
            // Add delay between batches
            if (i + BATCH_SIZE < fileFields.length) {
                await new Promise(resolve => setTimeout(resolve, 1000))
            }
        }

        return createApiResponse(200, parsedResumes)
    } catch (error) {
        console.error('Upload error:', error)
        return createApiResponse(500, null, 'Upload failed')
    }
})
