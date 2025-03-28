<template>
    <div class="profile-settings">
        <div class="profile-settings__divider" />
        <div class="profile-settings__header">
            <CommonApplicationAvatarUpdate>
                <template #content>
                    <span class="profile-settings__upload-label">Upload Image</span>
                    <span class="profile-settings__image-hint">Min 400x400px, PNG or JPEG</span>
                </template>
            </CommonApplicationAvatarUpdate>
        </div>
        <div class="profile-settings__form">
            <Label class="profile-settings__label">
                Name
                <span class="profile-settings__required">*</span>
            </Label>
            <Input class="profile-settings__input" placeholder="Name" />
            <Label class="profile-settings__label">
                Description
            </Label>
            <Input class="profile-settings__input" placeholder="Description" />
        </div>
    </div>
</template>

<style>
.profile-settings {
    @apply w-full flex flex-col gap-4;
}

.profile-settings__divider {
    @apply bg-[#E1E4EA] w-full h-[1px];
}

.profile-settings__header {
    @apply flex items-center space-x-2 px-5;
}

.profile-settings__image {
    @apply mr-5 h-16 w-16 rounded-full object-cover;
}

.profile-settings__details {
    @apply flex flex-col;
}

.profile-settings__upload-label {
    @apply text-primary;
}

.profile-settings__image-hint {
    @apply text-text-secondary text-[12px] mb-2;
}

.profile-settings__actions {
    @apply flex gap-3 mt-3;
}

.profile-settings__button {
    @apply rounded-xl !shadow-none !p-1.5 !h-[32px];
}

.profile-settings__button--remove {
    @apply !text-[#FB3748] !border-[#FB3748];
}

.profile-settings__button--change {
    @apply border-[#E1E4EA];
}

.profile-settings__form {
    @apply flex flex-col justify-center gap-3 m-4;
}

.profile-settings__label {
    @apply font-normal text-[14px];
}

.profile-settings__required {
    @apply text-red-500;
}

.profile-settings__input {
    @apply shadow-none;
}
</style>
