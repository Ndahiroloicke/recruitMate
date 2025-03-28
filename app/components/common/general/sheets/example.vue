<script setup lang="ts">
import type { GlobalModal, GlobalModalEmits } from '~/types/modal'

interface Props extends GlobalModal {
}

defineOptions({
    inheritAttrs: false,
})

defineProps<Props>()

const emit = defineEmits<GlobalModalEmits>()

const modelValue = defineModel({
    type: Boolean,
    default: false,
})
</script>

<template>
    <Sheet
        v-model:open="modelValue"
        @update:open="($event) => {
            if (!$event) {
                emit('hide')
            }
        }"
    >
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>
