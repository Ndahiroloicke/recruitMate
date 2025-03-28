<script setup lang="ts">
const modelValue = defineModel({
    default: '',
})

const input = useTemplateRef<any>('searchInput')
const { focused } = useFocus(input, { initialValue: false })

function handleKeydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        focused.value = true
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <div class="px-4 py-3.5 flex items-center gap-2 text-text-tertiary">
        <Icon name="ri:search-line" class="w-4 h-4" />
        <Input
            ref="searchInput" v-model="modelValue" placeholder="Search for campaigns"
            class="!rounded-none !border-none !text-text-primary !placeholder-text-text-tertiary h-[20px] px-0 focus:ring-2 focus:ring-transparent !shadow-none !focus:shadow-none !outline-none !focus:outline-none flex-1"
        />
        <Badge class="hidden sm:flex items-center gap-1 border-none px-[6px] py-0.5 font-medium text-captionM leading-4">
            ⌘K
        </Badge>
    </div>
</template>
