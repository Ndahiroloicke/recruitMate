interface ApiResponse<T> {
    status: number
    data: T | null
    error?: string
}

export function createApiResponse<T>(status: number, value?: T, error?: string): ApiResponse<T> {
    const response: ApiResponse<T> = {
        status,
        data: value ?? null,
    }

    if (error) {
        response.error = error
    }

    return response
}

export function formDataToObject(
    formData: Awaited<ReturnType<typeof readMultipartFormData>> | undefined,
) {
    const data: Record<string, any> = {}
    if (!formData)
        return data

    for (const field of formData) {
        if (!field.name)
            continue

        if ('filename' in field && field.filename) {
            data[field.name] = {
                filename: field.filename,
                mimeType: field.type,
                buffer: field.data,
            }
        }
        else if ('data' in field) {
            const value = field.data !== undefined ? field.data.toString('utf8') : undefined
            data[field.name] = value === 'undefined' ? undefined : value
        }
    }

    return data
}
