<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { HTMLAttributes, ShallowRef } from 'vue'
import { computed, inject, ref } from 'vue'

type Level = 1 | 2 | 3 | 4 | 5 | 6

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()

const editor = inject<ShallowRef<Editor>>('editor')
const imageUrl = ref('')
// const linkUrl = ref('')

function setHeading(level: string) {
    const numLevel = Number.parseInt(level) as Level
    if (numLevel >= 1 && numLevel <= 6) {
        editor?.value?.chain().focus().toggleHeading({ level: numLevel }).run()
    }
}

function setTextColor(color: string) {
    editor?.value?.chain().focus().setColor(color).run()
}

function toggleBold() {
    editor?.value?.chain().focus().toggleBold().run()
}

function toggleItalic() {
    editor?.value?.chain().focus().toggleItalic().run()
}

function toggleUnderline() {
    editor?.value?.chain().focus().toggleUnderline().run()
}

function toggleStrike() {
    editor?.value?.chain().focus().toggleStrike().run()
}

function setTextAlign(align: 'left' | 'center' | 'right') {
    if (editor?.value?.isActive({ textAlign: align }))
        editor?.value?.chain().focus().unsetTextAlign().run()
    else
        editor?.value?.chain().focus().setTextAlign(align).run()
}

function insertImage() {
    if (imageUrl.value) {
        editor?.value?.chain().focus().setImage({ src: imageUrl.value }).run()
        imageUrl.value = ''
    }
}

// function insertLink() {
//     if (linkUrl.value) {
//         editor?.value?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl.value }).run()
//         linkUrl.value = ''
//     }
// }

const activeHeading = computed(() => {
    const headingActive = editor?.value?.isActive('heading')
    return headingActive ? editor?.value?.getAttributes('heading')?.level : null
})
</script>

<template>
    <div
        v-if="editor"
        :class="`border-[1px] rounded-xl flex max-w-max overflow-x-auto border-[#DEE0E3] ${props.class}`"
    >
        <div class="border-r border-[#DEE0E3]">
            <Popover>
                <PopoverTrigger as="button" class="border-none outline-none !shadow-none">
                    <Button class="border-none outline-none shadow-none rounded-none" variant="secondary">
                        Heading {{ activeHeading ? activeHeading : '' }}
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="flex flex-col p-0" align="start">
                    <Button
                        v-for="i in 6" :key="i" size="sm" class="w-full px-4 flex items-center !rounded-none"
                        :variant="activeHeading === i ? 'tertiary' : 'ghost'" :value="i.toString()"
                        @click="setHeading(i.toString())"
                    >
                        <span class="flex justify-between items-center w-full">
                            Heading {{ i }}
                            <Icon v-if="activeHeading === i" class="w-4 h-4 ml-auto" name="ri:check-line" />
                        </span>
                    </Button>
                </PopoverContent>
            </Popover>
        </div>

        <label
            for="color"
            class="border-r border-[#DEE0E3] px-[10px] cursor-pointer text-[#0F132499] gap-1 flex items-center"
        >
            T
            <input
                id="color" type="color" class="w-4 h-4 rounded-full border-2 border-white shadow-sm outline-none"
                @input="setTextColor(($event.target as HTMLInputElement).value)"
            >
        </label>

        <div class="border-r border-[#DEE0E3] text-[#0F132499] px-[10px] flex gap-4 items-center">
            <span class="cursor-pointer" :class="{ 'text-blue-500': editor?.isActive('bold') }" @click="toggleBold">
                B
            </span>
            <span class="cursor-pointer" :class="{ 'text-blue-500': editor?.isActive('italic') }" @click="toggleItalic">
                <Icon class="w-4 h-4 text-bodyM flex items-center" name="ri:italic" />
            </span>
            <span
                class="underline cursor-pointer" :class="{ 'text-blue-500': editor?.isActive('underline') }"
                @click="toggleUnderline"
            >
                U
            </span>
            <span
                class="line-through cursor-pointer" :class="{ 'text-blue-500': editor?.isActive('strike') }"
                @click="toggleStrike"
            >
                S
            </span>
        </div>

        <div class="border-r border-[#DEE0E3] text-[#0F132499] gap-3 px-[10px] flex items-center">
            <Icon
                class="cursor-pointer" :class="{ 'text-blue-500': editor?.isActive({ textAlign: 'left' }) }"
                name="ri:align-left" @click="setTextAlign('left')"
            />
            <Icon
                class="cursor-pointer" :class="{ 'text-blue-500': editor?.isActive({ textAlign: 'center' }) }"
                name="ri:align-center" @click="setTextAlign('center')"
            />
            <Icon
                class="cursor-pointer" :class="{ 'text-blue-500': editor?.isActive({ textAlign: 'right' }) }"
                name="ri:align-right" @click="setTextAlign('right')"
            />
        </div>

        <div class="border-[#DEE0E3] text-[#0F132499] px-[10px] gap-3 flex items-center">
            <Popover>
                <PopoverTrigger as-child>
                    <Icon class="cursor-pointer" name="ri:image-2-line" />
                </PopoverTrigger>
                <PopoverContent align="end" side="top" class="w-80" :side-offset="4">
                    <div class="grid gap-2">
                        <div class="flex flex-col gap-2">
                            <Label for="image-url" class="text-captionL">Image URL</Label>
                            <Input
                                id="image-url"
                                v-model="imageUrl"
                                placeholder="https://example.com/image.jpg"
                                type="text"
                                class="col-span-2 h-8"
                            />
                        </div>
                        <Button variant="tertiary" class="w-full" @click="insertImage">
                            <Icon class="size-5" name="ri:check-line" />
                            Insert
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
            <!-- <Popover>
                <PopoverTrigger as-child>
                    <Icon class="cursor-pointer" name="ri:link" />
                </PopoverTrigger>
                <PopoverContent align="end" side="top" class="w-80" :side-offset="4">
                    <div class="grid gap-2">
                        <div class="flex flex-col gap-2">
                            <Label for="link-url" class="text-captionL">Link URL</Label>
                            <Input
                                id="link-url"
                                v-model="linkUrl"
                                placeholder="https://example.com"
                                type="text"
                                class="col-span-2 h-8"
                            />
                        </div>
                        <Button variant="tertiary" class="w-full" @click="insertLink">
                            <Icon class="size-5" name="ri:check-line" />
                            Insert
                        </Button>
                    </div>
                </PopoverContent>
            </Popover> -->
        </div>
    </div>
</template>

<style lang="postcss" scoped>
input[type="color"] {
    @apply appearance-none border-none rounded-full w-3 h-3 p-0 cursor-pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    @apply p-0;
}

input[type="color"]::-webkit-color-swatch {
    @apply border-none rounded-full p-0;
}
</style>
