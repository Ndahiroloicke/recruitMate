<script setup lang="ts">
interface Avatar {
    src?: string
    alt?: string
    initials?: string
    img?: string
}

const props = defineProps<{
    disableText?: boolean
    size?: 'sm' | 'base' | 'lg' | undefined | null
    avatars: Avatar[]
}>()

const displayedAvatars: Avatar[] = Array.isArray(props.avatars) ? props.avatars.slice(0, 3) : []

const extraCount: number = Array.isArray(props.avatars) && props.avatars.length > 3
    ? props.avatars.length - 3
    : 0
</script>

<template>
    <div v-if="props.avatars && props.avatars.length > 0" class="flex items-center gap-1">
        <div class="flex -space-x-2">
            <Avatar
                v-for="user in displayedAvatars"
                :key="user.alt || user.src"
                class="flex -space-x-4"
                :size="props.size"
                :src="user.src"
                :alt="user.alt"
                :initials="user.initials"
            >
                <NuxtImg :src="user.src ? user.src : '/images/Avatar.svg'" class="object-fit h-full w-full" alt="Avatar Image" />
            </Avatar>
        </div>
        <div v-if="extraCount > 0 && !props.disableText" class="text-captionM text-[#0F132499]">
            +{{ extraCount }} Team Members
        </div>
    </div>
</template>
