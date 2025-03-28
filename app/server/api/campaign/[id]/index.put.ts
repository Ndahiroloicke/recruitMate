import type { Database } from '~/server/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { stepOneSchema } from '~/lib/validation/campaignCreate'
import { uploadCompanyAvatar } from '~/server/utils/uploadAvatar'
import { checkByIdSchema } from '~/lib/validation/general'

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, checkByIdSchema.parse)
    const formData = await readMultipartFormData(event)
    const client = await serverSupabaseClient<Database>(event)
    const { data: { user } } = await client.auth.getUser()

    const formObject = formDataToObject(formData)
    const companyAvatar = formObject.companyAvatar
    const mappedData = {
        hiringCompany: formObject.hiring_company,
        campaignName: formObject.name,
        campaignDescription: formObject.description,
        ...formObject,
    }

    console.log('mappedData', mappedData)
    const result = stepOneSchema.parse(mappedData)

    if (companyAvatar) {
        if (!user?.id) {
            throw createError({ status: 401, statusMessage: 'Unauthorized' })
        }

        // eslint-disable-next-line node/prefer-global/buffer
        const avatarBuffer = Buffer.from(companyAvatar[0].buffer)
        result.companyAvatar = await uploadCompanyAvatar(client, user.id, avatarBuffer)
    }

    const { data: campaign, error } = await (await serverSupabaseClient<Database>(event))
        .from('campaigns')
        .update({
            hiring_company: result.hiringCompany,
            name: result.campaignName,
            description: result.campaignDescription,
            company_logo: result.companyAvatar,
        })
        .filter('id', 'eq', Number(id))
        .single()
        .then(result => result)

    if (error) {
        throw createError({
            status: Number(error.code),
            statusMessage: error.message,
        })
    }

    return createApiResponse(200, campaign)
})
