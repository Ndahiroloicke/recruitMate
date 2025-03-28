import type { Database } from '~/server/types/supabase'
import type { TableRows } from '~/types/supabase-helper'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { onboardingValidation } from '~/lib/validation/onboarding'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, (body) => {
        return onboardingValidation.parse(body)
    })

    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    const userAvatar = user?.user_metadata.picture

    const avatarResponse = await fetch(userAvatar)
    if (!avatarResponse.ok) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Avatar resmi alınamadı',
        })
    }

    const contentType = avatarResponse.headers.get('content-type') || 'image/jpeg'

    const avatarArrayBuffer = await avatarResponse.arrayBuffer()
    // eslint-disable-next-line node/prefer-global/buffer
    const avatarBuffer = Buffer.from(avatarArrayBuffer)

    const fileName = `${user?.id}-${Date.now()}.jpeg`

    const { data: storage, error: uploadError } = await client.storage
        .from('avatars')
        .upload(fileName, avatarBuffer, {
            cacheControl: '3600',
            upsert: true,
            contentType,
        })

    if (uploadError?.message) {
        throw createError({
            statusCode: 500,
            statusMessage: uploadError?.message,
        })
    }

    if (!storage) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Storage upload failed',
        })
    }

    const { data: publicUrlData } = client.storage
        .from('avatars')
        .getPublicUrl(storage.path)

    const newPublicUrl = publicUrlData.publicUrl

    if (!newPublicUrl) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Public URL not found',
        })
    }

    const { status, data, error } = await client
        .from('recruiters')
        .update({
            ...body,
            avatar: newPublicUrl,
        })
        .eq('auth_id', user?.id || '')
        .select()
        .single()

    const { error: updateAuthError } = await client.auth.updateUser({
        data: {
            picture: newPublicUrl,
        },
    })

    if (updateAuthError) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Auth user update failed',
        })
    }

    return createApiResponse<TableRows<'recruiters'>>(
        status,
        data || undefined,
        error?.message || undefined,
    )
})
