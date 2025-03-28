import { imageCompress } from '~/server/utils/bufferImage'

// eslint-disable-next-line node/prefer-global/buffer
export async function uploadCompanyAvatar(client: any, userId: string, buffer: Buffer): Promise<string> {
    const fileName = `company_avatar_${userId}-${Date.now()}.jpeg`
    const compressedImage = await imageCompress(buffer, {
        format: 'jpeg',
        width: 300,
        height: 300,
        lossless: true,
        quality: 80,
    })
    const { data: storage, error } = await client.storage.from('avatars').upload(
        fileName,
        compressedImage,
        {
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/jpeg',
        },
    )
    if (error) {
        throw new Error(error.message)
    }
    if (!storage) {
        throw new Error('Storage upload failed')
    }
    const { data: publicUrlData } = client.storage.from('avatars').getPublicUrl(storage.path)
    return publicUrlData.publicUrl
}
