<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import Card from '~/components/common/application/Card.vue'
import Input from '~/components/ui/input/Input.vue'
import Label from '~/components/ui/label/Label.vue'
import Textarea from '~/components/ui/textarea/Textarea.vue'
import { useOnboarding } from '~/store/onboarding'

defineProps({
    name: {
        type: String,
        required: false,
        default: '',
    },
    signature: {
        type: String,
        required: false,
        default: '',
    },
})

const emit = defineEmits(['next'])
const onboarding = useOnboarding()

const name = ref('')
const signature = ref('')
const loading = ref(false)

const profileSchema = z.object({
    name: z.string().min(1, 'Please enter your name'),
    signature: z.string().min(1, 'Please enter your email signature'),
})

async function handleNext() {
    loading.value = true
    const { success, error } = profileSchema.safeParse({ name: name.value, signature: signature.value })

    if (!success) {
        toast.error(error.errors[0]?.message || 'An error occurred')
        loading.value = false
        return
    }

    try {
        await onboarding.SaveOnboardingData({
            first_name: name.value.split(' ')[0] || '',
            last_name: name.value.split(' ')[1] || '',
            signature_text: signature.value,
            tos_accepted: onboarding.tosAccepted,
        })
    }
    catch (err) {
        toast.error(`Failed to save profile data ${err}`)
        loading.value = false
        return
    }

    loading.value = false
    emit('next')
}
</script>

<template>
    <div class="profile">
        <div class="profile__form">
            <div class="profile__step">
                <span class="profile__step--text">Step 2 / 3</span>
            </div>
            <div class="profile__header">
                <div class="profile__header-content">
                    <h5 class="profile__header-title">
                        Update your Profile
                    </h5>
                    <span class="profile__header-description">
                        Let's get started and take a look at the 3 steps before managing your candidates and team.
                    </span>
                </div>
            </div>
            <div class="profile__field">
                <Label class="profile__field-label" for="fullname">Name</Label>
                <Input id="fullname" v-model="name" placeholder="Name" class="profile__field-input" />
            </div>
            <div class="profile__field">
                <Label class="profile__field-label" for="signature">Email Signature</Label>
                <Textarea id="signature" v-model="signature" placeholder="Email Signature" class="profile__field-textarea" />
            </div>
            <Button class="profile__button" :loading="loading" @click="handleNext">
                Complete
            </Button>
        </div>

        <Card class="profile__card">
            <div class="profile__card-content">
                <div class="profile__card-header">
                    <h5 class="profile__card-title">
                        Update your Settings
                    </h5>
                    <p class="profile__card-description">
                        Let's get started and take a look at the 3 steps before managing your candidates and team.
                        Let's get started and take a look at the 3 steps before managing your candidates and team.
                    </p>
                </div>
                <div class="profile__card-footer">
                    <span class="profile__card-name">
                        {{ name }}
                    </span>
                    <span class="profile__card-signature">
                        {{ signature }}
                    </span>
                </div>
            </div>
        </Card>
    </div>
</template>

<style lang="postcss" scoped>
.profile {
    @apply flex gap-20 items-start max-lg:px-9;

    &__form {
        @apply flex flex-col  w-full sm:max-w-[400px];
    }

    &__step {
        @apply flex flex-col mb-5;

        &--text {
            @apply text-captionL text-text-secondary font-medium leading-5;
        }
    }

    &__header {
        @apply flex flex-col;

        &-content {
            @apply flex flex-col gap-2;
        }

        &-title {
            @apply text-h5 leading-9 tracking-[-0.5] font-semibold sm:whitespace-nowrap;
        }

        &-description {
            @apply font-normal text-bodyM leading-6 tracking-normal text-text-secondary;
        }
    }

    &__field {
        @apply  mt-4;

        &-input {
            @apply  mt-2 ;
        }

        &-textarea {
            @apply h-[82px] mt-2 mb-3 ;
        }
    }

    &__card {
        @apply w-[408px] py-2.5 px-6 h-[400px] border border-border-action-normal rounded-xl hidden md:block shadow-lg bg-white;

        &-content {
            @apply flex flex-col h-full justify-between;
        }

        &-title {
            @apply text-[#6F717C] font-normal text-h5 leading-9;
            font-family:Flow Rounded
        }

        &-description {
            @apply text-[#C2C3C9] leading-6 text-bodyS;
            font-family:Flow Rounded
        }

        &-footer {
            @apply flex justify-between items-start flex-wrap mb-4;
        }

        &-name {
            @apply font-medium text-captionS leading-4 tracking-normal text-text-primary;
        }

        &-signature {
            @apply text-captionS font-normal leading-4 tracking-normal text-text-secondary break-all max-w-[250px] whitespace-pre-line;
        }
    }
}
</style>
