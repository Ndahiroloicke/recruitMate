<script lang="ts" setup>
import type { ModalState } from '@/types/modal'
import { modalInjectionKey, useModal } from '@/composables/useModal'
import { VisuallyHidden } from 'radix-vue'

const modalState = inject(modalInjectionKey) as Ref<ModalState[]>

const { remove } = useModal()

function handleRemove(event: ModalState) {
    remove(event.props.name)
}
const isDesktop = useMediaQuery('(min-width: 768px)')
</script>

<template>
    <template
        v-if="modalState.length > 0"
    >
        <Dialog v-if="isDesktop" :open="modalState.length > 0" @update:open="(open) => !open && modalState.forEach(modal => handleRemove(modal))">
            <DialogContent class="p-0 sm:max-w-[425px]">
                <DialogTitle>
                    <VisuallyHidden>Modal</VisuallyHidden>
                </DialogTitle>
                <component
                    :is="modal.component"
                    v-for="modal in modalState"
                    :key="modal.props.name"
                    v-bind="modal.props || {}"
                    v-model="modal.show"
                    @hide="handleRemove(modal)"
                />
            </DialogContent>
        </Dialog>
        <Drawer v-else :open="modalState.length > 0" @update:open="(open) => !open && modalState.forEach(modal => handleRemove(modal))">
            <DrawerContent class="p-0">
                <component
                    :is="modal.component"
                    v-for="modal in modalState"
                    :key="modal.props.name"
                    v-bind="modal.props || {}"
                    v-model="modal.show"
                    @hide="handleRemove(modal)"
                />
            </DrawerContent>
        </Drawer>
    </template>
</template>
