import type { Editor } from '@tiptap/vue-3'
import * as z from 'zod'

const stepOneSchema = z.object({
    companyAvatar: z.any().optional(),
    hiringCompany: z
        .string({
            required_error: 'Hiring company is required',
        })
        .min(1, 'Hiring company is required'),
    campaignName: z
        .string({
            required_error: 'Campaign name is required',
        })
        .min(1, 'Campaign name is required'),
    campaignDescription: z
        .string({
            required_error: 'Campaign description is required',
        })
        .min(1, 'Campaign description is required'),
    tags: z.string().array().optional(),
})

const stepTwoSchema = z.object({
    importCandidates: z
        .string({
            required_error: 'Import candidates is required',
        }),
})

const importNewCandidateSchema = z.object({
    importNewCandidates: z.array(z.object({
        Name: z.string().nullable().optional(),
        'Contact Information': z.object({
            email: z.string().nullable().optional(),
            phone: z.string().nullable().optional()
        }).optional(),
        isValid: z.boolean(),
        Education: z.array(z.any()).optional(),
        'Work Experience': z.array(z.any()).optional(),
        Skills: z.array(z.string().nullable()).optional(),
        Certifications: z.array(z.string().nullable()).optional(),
        Summary: z.string().nullable().optional(),
        'Trait Personality': z.array(z.string().nullable()).optional(),
        Slogan: z.string().nullable().optional(),
        'Personal Info': z.array(z.string().nullable()).optional()
    }))
})

const importExistingCandidateSchema = z.object({
    importExistingCandidates: z
        .string({
            required_error: 'Import existing candidates is required',
        })
        .min(1, 'Import existing candidates is required'),
})

const importLinkedInUrlSchema = z.object({
    importLinkedInUrl: z.array(z.string()).min(1).max(3),
})

const stepThreeSchema = z.object({
    emailTemplate: z
        .string({
            required_error: 'Email templates is required',
        })
        .min(1, 'Email templates is required'),
})

const stepReadyMadeTemplateSchema = z.object({
    readyMadeTemplate: z.number({
        required_error: 'Ready made template is required',
    }),
})

const editorValidationSchema = z.object({
    tags: z
        .array(z.string().min(1, 'Tags cannot be empty'))
        .min(1, 'At least one tag is required'),
    title: z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title cannot exceed 100 characters'),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(200, 'Description cannot exceed 200 characters'),
    subjectEditor: z
        .custom<Editor>((value: Editor) => !value.isEmpty, {
            message: 'Subject content is required',
        }),
    editor: z
        .custom<Editor>((value: Editor) => !value.isEmpty, {
            message: 'Body content is required',
        }),
})

const baseSchema = z.object({
    teamId: z.string().nonempty({ message: 'Team ID is required.' }),
    tags: z.string().optional(),
    hiringCompany: z.string().optional(),
    campaignName: z.string().optional(),
    campaignDescription: z.string().optional(),
    importCandidates: z.string().optional(),
    importExistingCandidates: z.string().optional(),
    importNewCandidates: z.union([z.array(z.any()), z.string()]).optional(),
    importLinkedInUrl: z.array(z.string()).optional(),
    emailTemplate: z.string().optional(),
    readyMadeTemplate: z.string().optional(),
    companyAvatar: z.any().optional(),
})

const campaignWizardSchema = baseSchema.superRefine((data, ctx) => {
    try {
        stepOneSchema.parse({
            tags: data.tags?.split(','),
            hiringCompany: data.hiringCompany,
            campaignName: data.campaignName,
            campaignDescription: data.campaignDescription,
        })

        stepThreeSchema.parse({
            emailTemplate: data.emailTemplate,
        })

        stepReadyMadeTemplateSchema.parse({
            readyMadeTemplate: Number(data.readyMadeTemplate),
        })

        stepTwoSchema.parse({
            importCandidates: data.importCandidates,
        })

        if (data.importCandidates === '1') {
            if (typeof data.importNewCandidates === 'string') {
                importNewCandidateSchema.parse({
                    importNewCandidates: JSON.parse(data.importNewCandidates),
                })
            }
            else {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'importNewCandidates must be a string.',
                    path: ['importNewCandidates'],
                })
            }
        }
        else if (data.importCandidates === '2') {
            importExistingCandidateSchema.parse({
                importExistingCandidates: data.importExistingCandidates,
            })
        }
        else if (data.importCandidates === '3') {
            importLinkedInUrlSchema.parse({
                importLinkedInUrl: data.importLinkedInUrl,
            })
        }
        else {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid or missing importCandidates value.',
                path: ['importCandidates'],
            })
        }
    }
    catch (err: any) {
        pushZodErrorsToContext(err, ctx)
    }
})

function pushZodErrorsToContext(err: any, ctx: z.RefinementCtx) {
    if (err.issues) {
        for (const issue of err.issues) {
            ctx.addIssue(issue)
        }
    }
    else {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: err.message || 'Unknown validation error',
        })
    }
}

export {
    baseSchema,
    campaignWizardSchema,
    editorValidationSchema,
    importExistingCandidateSchema,
    importLinkedInUrlSchema,
    importNewCandidateSchema,
    stepOneSchema,
    stepReadyMadeTemplateSchema,
    stepThreeSchema,
    stepTwoSchema,
}
