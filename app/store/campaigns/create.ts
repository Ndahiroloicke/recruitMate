import type { FormState, GenericObject, ResetFormOpts } from 'vee-validate'
import type * as z from 'zod'
import { StepOne, StepThree, StepTwo } from '@/components/pages/campaigns/create'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import {
    importExistingCandidateSchema,
    importLinkedInUrlSchema,
    importNewCandidateSchema,
    stepOneSchema,
    stepReadyMadeTemplateSchema,
    stepThreeSchema,
    stepTwoSchema,
} from '~/lib/validation/campaignCreate'

export interface Step {
    step: number
    icon: string
    key: string
    title: string
    description: string
    components: VNode
    validationSchema?: z.ZodTypeAny
    subStep?: {
        [key: number]: {
            components: VNode
            noTemplate?: boolean
            validationSchema: z.ZodTypeAny
        }
    }
}

export type ResetForm = (state?: Partial<FormState<GenericObject>> | undefined, opts?: Partial<ResetFormOpts>) => void

export const useCampaignCreate = defineStore('campaignCreate', {
    state: () => ({
        stepIndex: 1,
        subStep: 0,
        templateId: null as number | null,
        selectTemplateId: null as number | null,
        steps: [
            {
                step: 1,
                icon: 'ri:notification-badge-line',
                key: 'campaignInformation',
                title: 'Campaign Information',
                description: 'Provide essential details about the campaign...',
                components: h(StepOne),
                validationSchema: stepOneSchema,
            },
            {
                step: 2,
                icon: 'ri:upload-cloud-2-line',
                key: 'importCandidates',
                title: 'Import Candidates',
                description: 'Select or upload Candidates',
                components: h(StepTwo.default),
                validationSchema: stepTwoSchema,
                subStep: {
                    1: {
                        components: h(StepTwo.ImportNewCandidate),
                        validationSchema: importNewCandidateSchema,
                    },
                    2: {
                        components: h(StepTwo.ImportExistingCandidate),
                        validationSchema: importExistingCandidateSchema,
                    },
                    3: {
                        components: h(StepTwo.ImportLinkedInUrl),
                        validationSchema: importLinkedInUrlSchema,
                    },
                },
            },
            {
                step: 3,
                icon: 'ri:mail-add-line',
                key: 'emailTemplate',
                title: 'Email Template',
                description: 'Select or create the email template you will use.',
                components: h(StepThree.default),
                validationSchema: stepThreeSchema,
                subStep: {
                    1: {
                        components: h(StepThree.ReadyMadeTemplate),
                        validationSchema: stepReadyMadeTemplateSchema,
                        noTemplate: true,
                    },
                    2: {
                        components: h(StepThree.NewTemplate),
                        validationSchema: stepReadyMadeTemplateSchema,
                        noTemplate: true,
                    },
                },
            },
        ] as Step[],
    }),

    getters: {
        currentStep: (state) => {
            const stepIndex = state.stepIndex - 1
            const step = state.steps[stepIndex] || state.steps[0]
            return step?.subStep && state.subStep !== 0
                ? step.subStep[state.subStep]?.components
                : step?.components
        },

        currentSchema: (state) => {
            const stepIndex = state.stepIndex - 1
            const step = state.steps[stepIndex] || state.steps[0]
            const schema
                = step?.subStep && state.subStep !== 0
                    ? step.subStep[state.subStep]?.validationSchema
                    : step?.validationSchema
            return schema ? toTypedSchema(schema) : undefined
        },
    },

    actions: {
        getStep(values?: GenericObject) {
            const stepIndex = this.stepIndex - 1
            const step = this.steps[stepIndex] || this.steps[0]
            const currentSubStep = values?.[step?.key || 0] || 0
            return { step, currentSubStep }
        },

        handleNext(nextStep: () => void, values: GenericObject) {
            const { step, currentSubStep } = this.getStep(values)

            if (step?.subStep && currentSubStep && this.subStep !== currentSubStep) {
                this.subStep = currentSubStep
                return
            }
            this.subStep = 0
            nextStep()
        },

        handlePrev(prevStep: () => void, values: GenericObject, resetForm: ResetForm) {
            const { step, currentSubStep } = this.getStep(values)

            if (step?.subStep && currentSubStep && this.subStep !== 0) {
                resetForm()

                return this.subStep = 0
            }
            this.subStep = 0
            prevStep()
        },

        async onSubmit(values: GenericObject) {
            const formData = new FormData()
            const router = useRouter()
            const route = useRoute()
            const teamId = route.params.teamId

            const rawCandidates = toRaw(values.importNewCandidates)
            const serializedCandidates = JSON.stringify(rawCandidates)
            const rawTags = toRaw(values.tags).join(',')
            const serializedTags = JSON.stringify(rawTags)

            for (const key in values) {
                if (key === 'importNewCandidates') {
                    formData.append(key, serializedCandidates)
                }
                else if (key === 'tags') {
                    formData.append(key, serializedTags)
                }
                else {
                    formData.append(key, values[key])
                }
            }

            formData.append('teamId', String(teamId))

            const { data, error } = await useFetch('/api/campaign/create', {
                method: 'POST',
                body: formData,
            })

            if (data.value) {
                toast.success('Campaign created successfully')
                router.push(`/app/1/campaigns/${data.value?.data}`)

                this.stepIndex = 1
                this.subStep = 0
            }

            if (error.value) {
                toast.error(error.value?.message || 'An error occurred')
            }
        },
    },
})
