import { z } from 'zod'

export const onboardingValidation = z.object({
    first_name: z.string({ required_error: 'First name is required' }),
    last_name: z.string({ required_error: 'Last name is required' }),
    signature_text: z.string({ required_error: 'Signature text is required' }),
    tos_accepted: z.boolean({ required_error: 'Terms of service must be accepted' }),
})

export type OnboardingData = z.infer<typeof onboardingValidation>
