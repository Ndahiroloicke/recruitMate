<script setup lang="ts">
import type { MentionNodeAttrs } from '@tiptap/extension-mention'
import type { SuggestionProps } from '@tiptap/suggestion'

interface ItemData {
    label: string
    color?: string
}

interface Props {
    items: ItemData[]
    command: (payload: { id: { label: string, color?: string, uniqueId: string } }) => void
    clientRect?: () => DOMRect
    suggestion?: SuggestionProps<any, MentionNodeAttrs>
}

const props = defineProps<Props>()

const selectedIndex = ref(0)

watch(
    () => props.items,
    () => {
        selectedIndex.value = 0
    },
)

function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
        upHandler()
        return true
    }

    if (event.key === 'ArrowDown') {
        downHandler()
        return true
    }

    if (event.key === 'Enter') {
        enterHandler()
        return true
    }

    return false
}

function upHandler() {
    selectedIndex.value = ((selectedIndex.value + props.items.length) - 1) % props.items.length
}

function downHandler() {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length
}

function enterHandler() {
    selectItem(selectedIndex.value)
}

function selectItem(index: number) {
    const item = props.items[index]
    if (!item)
        return

    const uniqueId = `mention-${Date.now()}-${Math.random()}`

    props.command({
        id: {
            label: item.label,
            color: item.color ?? 'purple',
            uniqueId,
        },
    })
}

function keyDownHandlerProxy(e: KeyboardEvent) {
    onKeyDown(e)
}

onMounted(() => {
    window.addEventListener('keydown', keyDownHandlerProxy)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', keyDownHandlerProxy)
})
</script>

<template>
    <div class="dropdown-menu">
        <template v-if="items.length">
            <button
                v-for="(item, index) in items"
                :key="index"
                class="dropdown-menu__item"
                :class="{ 'dropdown-menu__item--selected': index === selectedIndex }"
                @click="selectItem(index)"
            >
                {{ item.label }}
            </button>
        </template>
        <div v-else class="dropdown-menu__item">
            No result
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.dropdown-menu {
  @apply flex flex-col gap-1 overflow-auto p-2 relative border rounded-xl shadow-lg !bg-white;

  &__item {
    @apply flex items-center rounded-sm px-2 bg-transparent gap-1 text-left w-full;

    &:hover,
    &--selected {
      @apply  bg-background-overlay-active-normal;
    }

    &--selected {
      @apply bg-gray-200 ;
    }
  }
}
</style>
