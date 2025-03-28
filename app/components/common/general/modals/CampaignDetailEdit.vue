<script setup lang="ts">
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'
import { onMounted, reactive } from 'vue'
import Divider from '../Divider.vue'

interface Props extends GlobalModal {
    editFn: (formData: Record<string, any>) => void | Promise<void>
    data: any
}

const props = defineProps<Props>()
const emit = defineEmits<GlobalModalEmits>()

const formData = reactive({
    hiring_company: '',
    name: '',
    description: '',
    company_logo: '' as string | null,
})

onMounted(() => {
    const { hiring_company = '', name = '', description = '', company_logo = null } = props.data?.data ?? {}
    Object.assign(formData, { hiring_company, name, description, company_logo })
})

function onEditButtonClick() {
    if (!formData.company_logo) {
        formData.company_logo = null
    }
    props.editFn(formData)
    emit('hide')
}
</script>

<template>
    <div no-padding class="dialog__content">
        <div class="dialog__header">
            <CommonGeneralIconTemplate>
                <template #icon>
                    <div
                        class="dialog__icon"
                    >
                        <Icon
                            class="dialog__header-icon "
                            name="ri:notification-badge-line"
                        />
                    </div>
                </template>
            </CommonGeneralIconTemplate>
            <div class="dialog__header-container">
                <div class="dialog__header-title">
                    Campaign Edit
                </div>
                <span class="dialog__description">Provide essential details about the campaign, including its title, description, and key objectives</span>
            </div>
        </div>
        <Divider />
        <div class="dialog__body">
            <div class="dialog__field">
                <CommonApplicationAvatarUpdate
                    v-model="formData.company_logo"
                    class="dialog__user"
                    :is-show-update-button="true"
                    :default-image="formData.company_logo || '/images/Company.svg'"
                />
            </div>

            <div class="dialog__field">
                <Label class="dialog__label">
                    Hiring Company <span class="dialog__required">*</span>
                </Label>
                <Input
                    v-model="formData.hiring_company"
                    placeholder="Hiring Company"
                />
            </div>
            <div class="dialog__field">
                <Label class="dialog__label">
                    Campaign Name<span class="dialog__required">*</span>
                </Label>
                <Input
                    v-model="formData.name"
                    placeholder="Campaign Name"
                />
            </div>
            <div class="dialog__field">
                <Label class="dialog__label">
                    Campaign Description<span class="dialog__required">*</span>
                </Label>
                <Input
                    v-model="formData.description"
                    placeholder="Campaign Description"
                />
            </div>
        </div>

        <div class="dialog__footer">
            <Button
                class="dialog__button-remove"
                variant="secondary"
                @click="emit('hide')"
            >
                Cancel
            </Button>
            <Button
                class="dialog__button-save"
                size="md"
                variant="primary"
                @click="onEditButtonClick"
            >
                Apply Changes
            </Button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.dialog {
  &__content {
    @apply w-full pt-0 py-5 md:pt-5 px-0;
  }

  &__header {
    @apply flex gap-3 mx-5 mb-4 items-center max-w-[404px];
  }

  &__header-container{
   @apply flex flex-col gap-1
  }

  &__header-title{
   @apply  font-medium
  }

  &__body {
    @apply mx-5 mb-7 flex flex-col gap-3 mt-2;
  }

  &__description {
    @apply text-captionM text-text-secondary;
  }

  &__icon{
    @apply flex items-center justify-center h-10 w-10
  }

  &__field{
        @apply flex flex-col gap-2;
    }

  &__footer {
    @apply sm:justify-start grid grid-cols-2 gap-2 px-5;
  }

  &__label{
    @apply text-bodyS;
  }

  &__required{
    @apply text-text-red-accent;
  }

  &__user {
    @apply flex gap-2 items-center ;
  }

  &__header-icon {
    @apply text-text-tertiary;
  }

  &__button-remove {
    @apply w-full;
  }

  &__button-save {
    @apply w-full;
  }
}
</style>
