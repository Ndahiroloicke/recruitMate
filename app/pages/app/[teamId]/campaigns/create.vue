<script setup lang="ts">
import { useCampaignCreate } from '~/store/campaigns/create'

const campaignCreate = useCampaignCreate()
</script>

<template>
    <Stepper v-slot="{ nextStep, prevStep, isLastStep }" v-model="campaignCreate.stepIndex" class="campaignsPageContent" @update:model-value="campaignCreate.subStep = 0">
        <CommonApplicationMainLayout class="campaignsPageContent" title="Create Campaign" is-show-back-button use-back-button="/app/campaigns">
            <template #underLayout>
                <PagesCampaignsCreateSteps :steps="campaignCreate.steps" />
            </template>

            <template #main>
                <Form v-slot="{ meta, values, validate, resetForm }" keep-values :validation-schema="campaignCreate.currentSchema">
                    <form
                        @submit="(e) => {
                            e.preventDefault()
                            validate()

                            if (campaignCreate.stepIndex === campaignCreate.steps.length && meta.valid) {
                                campaignCreate.onSubmit(values)
                            }
                        }"
                    >
                        <div
                            class="campaignsPageContent__form-container"
                            :class="{
                                'no-clamp': campaignCreate.getStep(values).step?.subStep?.[campaignCreate.subStep]?.noTemplate,
                            }"
                        >
                            <PagesCampaignsCreateFormHeader
                                v-if="!campaignCreate.getStep(values).step?.subStep?.[campaignCreate.subStep]?.noTemplate"
                                :steps="campaignCreate.steps"
                                :step-index="campaignCreate.stepIndex"
                            />

                            <component :is="campaignCreate.currentStep" />
                        </div>

                        <div
                            v-if="!campaignCreate.getStep(values).step?.subStep?.[campaignCreate.subStep]?.noTemplate"
                            class="campaignsPageContent__form-footer"
                        >
                            <Button
                                :disabled="campaignCreate.stepIndex === 1 && campaignCreate.subStep === 0"
                                variant="secondary"
                                size="lg"
                                @click="campaignCreate.handlePrev(prevStep, values, resetForm)"
                            >
                                Back
                            </Button>

                            <div class="campaignsPageContent__form-footer-buttons">
                                <Button
                                    v-if="!isLastStep || campaignCreate.getStep(values).step?.subStep !== undefined"
                                    :type="meta.valid ? 'button' : 'submit'"
                                    :disabled="!meta.valid"
                                    size="lg"
                                    @click="meta.valid && campaignCreate.handleNext(nextStep, values)"
                                >
                                    Next
                                </Button>

                                <Button
                                    v-if="isLastStep && campaignCreate.getStep(values).step?.subStep === undefined"
                                    size="lg"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </template>
        </CommonApplicationMainLayout>
    </Stepper>
</template>

<style lang="postcss" scoped>
.campaignsPageContent {
    @apply w-full h-full;

    &__form-container {
        @apply flex flex-col gap-4 mt-4 px-4 max-w-lg mx-auto;

        &.no-clamp {
            @apply max-w-full p-0 m-0;
        }
    }

    &__step_container {
        @apply w-full h-full flex flex-col gap-4;
    }

    &__form-field {
        @apply flex flex-col gap-2;
    }

    &__form-footer {
        @apply flex items-center justify-between mt-4 pb-6 px-4 max-w-lg mx-auto;
    }

    &__form-footer-buttons {
        @apply flex items-center gap-3;
    }
}
</style>
