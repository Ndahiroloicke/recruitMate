<script setup lang="ts">
import { Color } from '@tiptap/extension-color'
import FontSize from '@tiptap/extension-font-size'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import Mention from '@tiptap/extension-mention'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/vue-3'
import Variables from '~/components/common/application/Editor/plugins/Variables'

const props = withDefaults(
    defineProps<{
        modelType?: 'html' | 'json'
        class?: any
    }>(),
    {
        modelType: 'html',
    },
)

const model = defineModel<any>({ default: '' })

function onUpdate(val: any) {
    if (props.modelType === 'html') {
        model.value = val.editor.getHTML()
    }
    else if (props.modelType === 'json') {
        model.value = JSON.stringify(val.editor.getJSON())
    }
}

const mention = Mention.configure({
    HTMLAttributes: {
        'data-variable-mention': '',
    },
    renderHTML: ({ node }) => {
        const { label, color, uniqueId } = node.attrs.id

        return [
            'span',
            {
                'class': `badge rounded-lg px-[0.1875rem] py-0.5 ${color}`,
                'data-mention-uid': uniqueId,
            },
            `${label}`,
        ]
    },

    suggestion: Variables as any,
})

const editor = useEditor({
    content: model.value,
    editorProps: {
        attributes: {
            class: 'editor__content',
        },
    },
    onUpdate,
    extensions: [
        mention,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        Table.configure({
            resizable: true,
        }),

        Image.configure({
            allowBase64: true,
            inline: true,
        }),
        TextAlign.configure({ alignments: ['left', 'center', 'right'], types: ['paragraph', 'heading'] }),
        Link.configure({
            openOnClick: false,
            defaultProtocol: 'https',
        }),
        TextStyle,
        Superscript,
        SubScript,
        Typography,
        Highlight,
        TableRow,
        TableHeader,
        StarterKit,
        TableCell,
        Underline,
        FontSize,
    ],
})

const subjectEditor = useEditor({
    content: model.value,
    editorProps: {
        attributes: {
            class: 'editor-input__content',
        },
    },

    onUpdate,

    extensions: [
        StarterKit,
        mention,
    ],
})

provide('editor', editor)
provide('subjectEditor', subjectEditor)
</script>

<template>
    <div class="newTemplate">
        <PagesCampaignsCreateStepThreeEditor />
        <PagesCampaignsCreateStepThreeVariables v-if="editor" class="hidden lg:flex" :editor="editor" />
    </div>
</template>

<style lang="postcss" scoped>
.newTemplate {
    @apply flex w-full flex-col lg:flex-row sm:px-4 xl:px-0 max-w-7xl gap-6 mx-auto;
}
</style>
