import type { Component } from 'vue'
import type { Ref } from 'vue'

export interface GlobalModal {
    class?: string | object | string[]
    name: string
    modelValue?: boolean
    loading: boolean
}

export interface GlobalModalEmits {
    hide: []
    submit: []
}

export interface ModalState {
    component: Component | string
    props: GlobalModal
    show: Ref<boolean>
}
