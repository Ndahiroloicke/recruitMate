import sharp from 'sharp'

// eslint-disable-next-line node/prefer-global/buffer
export async function urlToBuffer(url: string): Promise<Buffer> {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`)
        }
        const arrayBuffer = await response.arrayBuffer()

        // eslint-disable-next-line node/prefer-global/buffer
        const buffer = Buffer.from(arrayBuffer)
        return buffer
    }
    catch (error) {
        throw new Error(`Failed to fetch image: ${error}`)
    }
}

// eslint-disable-next-line node/prefer-global/buffer
export async function imageCompress(image: Buffer, options: { width?: number, height?: number, quality?: number, format?: 'jpeg' | 'webp', lossless?: boolean } = {
    quality: 100,
    format: 'webp',
    lossless: true,
    width: 64,
    height: 64,
// eslint-disable-next-line node/prefer-global/buffer
}): Promise<Buffer> {
    try {
        const optimizedImage = await sharp(image)
            .resize(options.width, options.height)
            .toFormat(options.format || 'jpeg', {
                quality: options.quality,
                lossless: options.lossless,
            })
            .toBuffer()

        return optimizedImage
    }
    catch (error) {
        throw new Error(`Image processing or upload failed: ${error}`)
    }
}
