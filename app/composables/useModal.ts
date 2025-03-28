import type { ComponentProps } from '@/types/component'
import type { GlobalModal, ModalState } from '@/types/modal'
import type { Component, InjectionKey } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { customAlphabet } from 'nanoid'
import { inject, ref } from 'vue'

const generateId = customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    12,
)

export const modalInjectionKey: InjectionKey<Ref<ModalState[]>> = Symbol('recruitmate.modal')

function _useModal() {
    const modalState = inject(modalInjectionKey) as Ref<ModalState[]>

    const isOpen = ref(false)

    function open<T extends Component>(component: T, props?: GlobalModal & ComponentProps<T>) {
        let name: string

        if (props?.name !== undefined)
            name = props.name
        else if (component.name !== undefined)
            name = component.name
        else
            name = `dynamic_modal_${generateId()}`

        const modal = modalState.value.find(m => m.props.name === name)

        if (modal === undefined) {
            const modalItem = {
                component: shallowRef(component),
                props: {
                    loading: false,
                    ...props ?? {},
                    name,
                },
                show: ref(false),
            } as ModalState

            modalState.value.push(modalItem as unknown as ModalState)

            void nextTick(() => {
                modalItem.show.value = true
            })
        }
        else {
            modal.show.value = true
        }
    }

    function hide(name: string) {
        const modal = modalState.value.find(m => m.props.name === name)

        if (modal !== undefined)
            modal.show.value = false
    }

    function remove(name?: string) {
        if (name === undefined)
            return

        const index = modalState.value.findIndex(v => v.props.name === name)

        if (index !== -1)
            modalState.value.splice(index, 1)
    }

    function patch<T extends Component = object>(props: Partial<GlobalModal & ComponentProps<T>>) {
        const modal = modalState.value.find(m => m.props.name === props.name)

        if (modal === undefined)
            return

        modal.props = {
            ...modal.props,
            ...props,
        }
    }

    return {
        isOpen,
        open,
        patch,
        remove,
        hide,
    }
}

export const useModal = createSharedComposable(_useModal)
