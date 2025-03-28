<script setup lang="ts">
import Divider from '~/components/common/general/Divider.vue'
import DeleteAccountDialog from '~/components/common/general/modals/settings/DeleteAccount.vue'
import EmailAddressDialog from '~/components/common/general/modals/settings/EmailAddress.vue'
import PhoneNumberDialog from '~/components/common/general/modals/settings/PhoneNumber.vue'
import SignatureDialog from '~/components/common/general/modals/settings/Signature.vue'
import LegalNameDialog from '~/components/common/general/modals/settings/UserName.vue'
import { useAuth } from '~/store/auth'

const modal = useModal()
const auth = useAuth()
function openModal(component: any, data: any) {
    const modalData = typeof data === 'object' ? data : { data }

    modal.open(component, modalData)
}

const userAvatar = computed({

    get: () => auth.user?.avatar,
    set: (value) => {
        if (auth.user) {
            auth.user.avatar = value ?? null
        }
    },
})
</script>

<template>
    <div class="settings-general clamp">
        <div class="settings-general__item">
            <div class="settings-general__col">
                <span class="settings-general__title">Upload Logo</span>
                <span class="settings-general__description">
                    Min 400x400px, PNG or JPEG formats.
                </span>
            </div>
            <div>
                <CommonApplicationAvatarUpdate
                    v-model="userAvatar"
                    class="settings-general__action"
                    :is-show-update-button="true"
                />
            </div>
        </div>
        <Divider />
        <div class="settings-general__item">
            <div class="settings-general__col">
                <span class="settings-general__title">User Name</span>
                <span class="settings-general__description">
                    The official user name.
                </span>
            </div>
            <div class="settings-general__col">
                <span class="text-captionL font-normal leading-5 tracking-[-0.1]">
                    {{ auth.user?.first_name }} {{ auth.user?.last_name }}
                </span>
                <Button size="sm" variant="link" class="settings-general__button" @click="openModal(LegalNameDialog, auth.user?.first_name ? auth.user?.first_name : '')">
                    <span>Edit</span>
                    <Icon name="ri:arrow-right-s-line" />
                </Button>
            </div>
        </div>
        <Divider />

        <div class="settings-general__item">
            <div class="settings-general__col">
                <span class="settings-general__title">Email Address</span>
                <span class="settings-general__description">
                    The official email address for billings and contact requests.
                </span>
            </div>
            <div class="settings-general__col">
                <span class="text-captionL font-normal leading-5 tracking-[-0.1]">
                    {{ auth.user?.email }}
                </span>
                <Button size="sm" variant="link" class="settings-general__button" @click="openModal(EmailAddressDialog, auth.user?.email ? auth.user?.email : '')">
                    <span>Edit</span>
                    <Icon name="ri:arrow-right-s-line" />
                </Button>
            </div>
        </div>
        <Divider />

        <div class="settings-general__item">
            <div class="settings-general__col">
                <span class="settings-general__title">Phone Number</span>
                <span class="settings-general__description">
                    The official phone number for billing and contact requests.
                </span>
            </div>
            <div class="settings-general__col">
                <span class="text-captionL font-normal leading-5 tracking-[-0.1]">
                    +1 (416) 555-7890
                </span>
                <Button size="sm" variant="link" class="settings-general__button" @click="openModal(PhoneNumberDialog, '')">
                    <span>Edit</span>
                    <Icon name="ri:arrow-right-s-line" />
                </Button>
            </div>
        </div>
        <Divider />
        <div class="settings-general__item">
            <div class="settings-general__col">
                <span class="settings-general__title">Email Signature</span>
                <span class="settings-general__description">
                    The official phone number for billing and contact requests.
                </span>
            </div>
            <div class="settings-general__col">
                <span class="text-captionL font-normal leading-5 tracking-[-0.1] whitespace-pre-line">
                    {{ auth.user?.signature_text }}
                </span>
                <Button size="sm" variant="link" class="settings-general__button" @click="openModal(SignatureDialog, auth.user?.signature_text ? auth.user?.signature_text : '')">
                    <span>Edit</span>
                    <Icon name="ri:arrow-right-s-line" />
                </Button>
            </div>
        </div>
        <Divider />

        <div class="settings-general__item">
            <div class="settings-general__col">
                <span class="settings-general__title">Delete Account</span>
                <span class="settings-general__description">
                    Deleting your account will permanently remove all your data. This action cannot be undone.
                </span>
            </div>
            <div>
                <Button
                    variant="destructive" size="sm" class="settings-general__button--destructive" @click="openModal(DeleteAccountDialog, auth.user?.id)"
                >
                    Delete Account
                </Button>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.settings-general {
    @apply grid grid-cols-1 px-6 sm:px-4;

    &__item {
        @apply grid grid-cols-1 md:grid-cols-2 items-center py-5 max-md:gap-6;
    }

    &__col {
        @apply flex flex-col max-w-[350px] gap-1;
    }

    &__title {
        @apply text-captionL font-medium;
    }

    &__description {
        @apply text-captionM font-normal text-text-sub-600;
    }

    &__button {
        @apply !text-left inline-flex max-w-max !p-0 !text-text-blue-accent;
    }
    &__action{
        @apply flex items-center
    }
}
</style>
