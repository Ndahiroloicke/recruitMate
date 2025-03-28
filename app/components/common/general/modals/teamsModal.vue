<script setup lang="ts">
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'
import ModalAddPeople from '~/components/pages/teams/ModalAddPeople.vue'
import ModalNamingTeam from '~/components/pages/teams/ModalNamingTeam.vue'
import { toast } from 'vue-sonner'
import { useTeams } from '~/store/teams'
import { useRoute } from 'vue-router'

interface Props extends GlobalModal {
    startAt?: number
}

defineOptions({
    inheritAttrs: false,
})

const { startAt = 0 } = defineProps<Props>()
const teamsStore = useTeams()
const emit = defineEmits<GlobalModalEmits>()

const modelValue = defineModel({
    type: Boolean,
    default: false,
})

const steps = [{
    stepContent: ModalNamingTeam,
    firstButtonText: 'Cancel',
    secondButtonText: 'Continue',
}, {
    stepContent: ModalAddPeople,
    firstButtonText: 'Skip',
    secondButtonText: 'Complete',
}]

const currentStep = ref(startAt)
const modalAddPeopleRef = ref()

async function handleStep() {
    console.log('Current step:', currentStep.value)
    
    if (currentStep.value === steps.length - 1) {
        try {
            const route = useRoute()
            const teamId = route.params.teamId
            const emails = modalAddPeopleRef.value?.getEmails() || []
            
            if (!emails.length) {
                toast.error('Please add at least one email')
                return
            }

            console.log('Attempting to send invitation:', {
                teamId,
                emails,
                currentTeam: teamsStore.currentTeam
            })

            const response = await $fetch('/api/teams/invite', {
                method: 'POST',
                body: {
                    emails,
                    teamId: teamId?.toString() || teamsStore.currentTeam?.id?.toString(),
                },
                retry: 3,
                retryDelay: 1000,
                timeout: 30000,
            })
            
            if (!response || !response.success) {
                throw new Error('Failed to send invitations')
            }

            console.log('Invitation response:', response)
            toast.success('Invitations sent successfully!')
            emit('close')
        } catch (error: any) {
            console.error('Failed to send invitations:', error)
            const message = error.cause?.name === 'TimeoutError' 
                ? 'Request timed out. Please try again.'
                : 'Failed to send invitations. Please try again.'
            toast.error(message)
        }
        return
    }
    
    console.log('Moving to next step')
    currentStep.value++
}
</script>

<template>
    <div class="dialog py-5 px-0">
        <DialogHeader class="dialog__header">
            <CommonGeneralIconTemplate>
                <template #icon>
                    <Icon class="dialog__header-icon" name="ri:notification-badge-line" />
                </template>
            </CommonGeneralIconTemplate>

            <div class="dialog__header-info">
                <DialogTitle class="dialog__header-title">
                    Create New Team
                </DialogTitle>
                <DialogDescription class="dialog__header-description">
                    Define your team's purpose, name, and objectives.
                </DialogDescription>
            </div>
        </DialogHeader>
        <component 
            :is="steps[currentStep]?.stepContent" 
            ref="modalAddPeopleRef"
        />
        <DialogFooter class="dialog__footer">
            <DialogClose as-child>
                <Button class="dialog__footer-button" variant="secondary">
                    {{ steps[currentStep]?.firstButtonText }}
                </Button>
            </DialogClose>
            <Button
                class="dialog__footer-button dialog__footer-button--primary" size="md" variant="primary"
                @click="handleStep"
            >
                {{ steps[currentStep]?.secondButtonText }}
            </Button>
        </DialogFooter>
    </div>
</template>

<style scoped>
.dialog {
    @apply w-full py-5 p-0;

    &__header {
        @apply flex flex-row mb-4 gap-3.5 px-5;

        &-icon {
            @apply w-5 h-5;
        }

        &-info {
            @apply text-black flex flex-col  justify-start gap-1;
        }

        &-title {
            @apply text-captionL font-medium justify-start text-start items-start;
        }

        &-description {
            @apply text-[12px] text-text-secondary text-start;
        }
    }

    &__footer {
        @apply sm:justify-start grid grid-cols-2 gap-2 px-5;

        &-button {
            @apply w-full;

        }
    }
}
</style>
