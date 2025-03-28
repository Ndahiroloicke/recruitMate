<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { cn } from '@/lib/utils'
import { computed, ref } from 'vue'
import { variables } from '~/components/common/application/Editor/plugins/Variables'

const props = defineProps<{
    class?: string
    editor: Editor
}>()

const searchQuery = ref('')

const filteredVariables = computed(() => {
    return variables.filter(variable =>
        variable.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
})

function onVariableClick(variable: { label: string, color: string }) {
    if (!props.editor)
        return

    const uniqueId = `mention-${Date.now()}-${Math.random()}`

    props.editor
        .chain()
        .focus()
        .insertContent([
            {
                type: 'mention',
                attrs: {
                    id: {
                        label: variable.label,
                        color: variable.color,
                        uniqueId,
                    },
                },
            },
            { type: 'text', text: ' ' },
        ])
        .run()
}
</script>

<template>
    <div :class="cn('p-6 border border-[#E9EAEC] flex flex-col gap-4 w-72 rounded-[16px] mt-4', props.class)">
        <div class="text-[#0F132499] text-captionL">
            All Subject
        </div>

        <Input v-model="searchQuery" placeholder="Search variables..." />

        <Badge
            v-for="(variable, index) in filteredVariables"
            :key="index"
            class="text-captionM truncate max-w-max !rounded-full cursor-pointer"
            :color="variable.color"
            size="lg"
            @click="onVariableClick(variable)"
        >
            {{ variable.label }}
        </Badge>

        <div v-if="filteredVariables.length === 0" class="text-captionM text-gray-400 w-full">
            No results found.
        </div>
    </div>
</template>
