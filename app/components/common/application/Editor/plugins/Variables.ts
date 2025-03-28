import type { MentionNodeAttrs } from '@tiptap/extension-mention'
import type { SuggestionProps } from '@tiptap/suggestion'
import type { Content, Instance, Props } from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import Variables from './Variables.vue'

interface Variable {
    label: string
    color: 'purple' | 'orange' | 'green'
}

export const variables: Variable[] = [
    { label: 'Candidate Name', color: 'purple' },
    { label: 'Candidate Full Name', color: 'purple' },
    { label: 'Candidate Last Name', color: 'purple' },
    { label: 'Candidate Phone Number', color: 'purple' },
    { label: 'Job Available', color: 'orange' },
    { label: 'Available Position', color: 'orange' },
    { label: 'Job Location', color: 'orange' },
    { label: 'Recruiter Name', color: 'green' },
    { label: 'Recruiter Email', color: 'green' },
]

interface MentionProps extends SuggestionProps<any, MentionNodeAttrs> {
    query: string
    editor: any
    clientRect?: () => DOMRect
    event?: KeyboardEvent
}

export default {
    items: ({ query }: { query: string }) => {
        return variables.filter(item =>
            item.label.toLowerCase().startsWith(query.toLowerCase()),
        )
    },

    render: () => {
        let component: VueRenderer | null = null
        let popup: Instance<Props> | null = null

        return {
            onStart: (props: MentionProps) => {
                component = new VueRenderer(Variables, {
                    props,
                    editor: props.editor,
                })

                if (!props.clientRect) {
                    return
                }

                popup = tippy(document.body, {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element as Content,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                })

                document.addEventListener('keydown', handleKeyDown)
            },

            onUpdate(props: MentionProps) {
                component?.updateProps(props)

                if (!props.clientRect) {
                    return
                }

                popup?.setProps({
                    getReferenceClientRect: props.clientRect,
                })
            },

            onKeyDown(props: MentionProps) {
                if (props.event?.key === 'Escape') {
                    popup?.hide()
                    return true
                }

                if (props.event?.key === 'ArrowDown' || props.event?.key === 'ArrowUp') {
                    props.event.preventDefault()
                    return component?.ref?.onKeyDown(props)
                }

                return component?.ref?.onKeyDown(props)
            },

            onExit() {
                popup?.destroy?.()
                component?.destroy()
                document.removeEventListener('keydown', handleKeyDown)
            },
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault()
            }
        }
    },
}
