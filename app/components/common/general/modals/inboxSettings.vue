<script setup lang="ts">
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'
import Label from '~/components/ui/label/Label.vue'

interface Props extends GlobalModal {
}

defineOptions({
    inheritAttrs: false,
})

defineProps<Props>()

const emit = defineEmits<GlobalModalEmits>()

const modelValue = defineModel({
    type: Boolean,
    default: false,
})

const isAiAnswer = ref(false)
</script>

<template>
    <Dialog
        v-model:open="modelValue"
        @update:open="($event) => {
            if (!$event) {
                emit('hide')
            }
        }"
    >
        <div class="inbox-settings">
            <div class="inbox-settings__header">
                <div class="inbox-settings__title">
                    Inbox Settings
                </div>
                <div class="inbox-settings__description">
                    You can set presets for inbox here.
                </div>
            </div>
            <div class="inbox-settings__body">
                <div class="inbox-settings__field">
                    <NumberField>
                        <Label for="day-later" class="inbox-settings__label">
                            <span>Day Later</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger as-child>
                                        <Icon name="ri:question-fill" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Here, select how many days after you want to automatically access the answer.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </Label>
                        <NumberFieldContent>
                            <NumberFieldDecrement />
                            <NumberFieldInput default-value="1" />
                            <NumberFieldIncrement />
                        </NumberFieldContent>
                    </NumberField>
                </div>
                <div class="inbox-settings__field">
                    <Label>Answer</Label>
                    <Textarea :placeholder="isAiAnswer ? 'Text Message AI Answer' : 'Text Message Manual Answer'" />
                </div>

                <div>
                    <Switch
                        v-model:checked="isAiAnswer"
                        label-position="right"
                        label="AI Answer"
                    />
                </div>
            </div>

            <div>
                <div class="inbox-settings__button_container">
                    <Button class="inbox-settings__button" type="button" variant="primary">
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<style lang="postcss" scoped>
.inbox-settings {
    @apply p-6;

    &__header {
        @apply mb-3 !text-start;
    }

    &__title {
        @apply text-bodyL font-medium;
    }

    &__description {
        @apply text-captionM !text-text-sub-600;
    }

    &__body {
        @apply flex flex-col  gap-4 my-6;
    }

    &__field {
        @apply flex flex-col w-full gap-2.5;
    }

    &__label {
        @apply text-captionL font-medium flex  items-center gap-1;
    }
    &__button_container{
        @apply w-full flex justify-end
    }
    &__button{
        @apply w-full md:w-fit
    }

}
</style>
