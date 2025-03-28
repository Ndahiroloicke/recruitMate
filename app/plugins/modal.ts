import { defineNuxtPlugin } from '#imports'
import { ref } from 'vue'
import { modalInjectionKey } from '../composables/useModal'

export default defineNuxtPlugin((nuxtApp) => {
    const modalState = ref<any[]>([])

    nuxtApp.vueApp.provide(modalInjectionKey, modalState)
})
