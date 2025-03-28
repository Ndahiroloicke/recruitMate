<script setup lang="ts">
interface Person {
    fullName: string
    email: string
    imgPath: string
}

const invitedEmails = ref<string[]>([])
const emailInput = ref('')

function addEmail() {
    if (emailInput.value && !invitedEmails.value.includes(emailInput.value)) {
        invitedEmails.value.push(emailInput.value)
        emailInput.value = ''
    }
}

// Expose emails to parent
defineExpose({
    getEmails: () => invitedEmails.value
})
</script>

<template>
    <div class="invite-friends">
        <div class="invite-friends__input-group">
            <Input 
                v-model="emailInput"
                placeholder="Email" 
                class="invite-friends__input" 
                @keyup.enter="addEmail"
            />
            <Button 
                class="invite-friends__invite-button"
                @click="addEmail"
            >
                Invite
            </Button>
        </div>
        <div class="invite-friends__divider">
            <div class="invite-friends__divider-line" />
            <span class="invite-friends__divider-text">
                Invited friends [{{ invitedEmails.length }}]
            </span>
        </div>
        <div
            v-for="(email, index) in invitedEmails"
            :key="index"
            class="invite-friends__friend"
        >
            <div class="invite-friends__friend-details">
                <span class="invite-friends__friend-details-email">
                    {{ email }}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.invite-friends {
    @apply px-5 flex flex-col pb-6 gap-4 w-full;

    &__input-group {
        @apply flex items-center h-full;
    }

    &__input {
        @apply shadow-none rounded-r-none;
    }

    &__invite-button {
        @apply rounded-r-xl border-[#DEE0E3] px-[7px] cursor-pointer border-l-0 border-[1.5px] h-full flex items-center text-captionL py-[6.5px];
    }

    &__divider {
        @apply relative;

        &-line {
            @apply bg-[#E9EAEC] h-[1px];
        }

        &-text {
            @apply bg-[#FFF] px-2 text-captionM text-text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
        }
    }

    &__friend {
        @apply flex items-center gap-2;

        &-avatar {
            @apply shrink;
        }

        &-img {
            @apply h-10 !w-10 flex-1 object-cover;
        }

        &-details {
            @apply flex flex-col;

            &-name {
                @apply text-[14px];
            }

            &-email {
                @apply text-text-secondary text-[12px];
            }
        }
    }
}
</style>
