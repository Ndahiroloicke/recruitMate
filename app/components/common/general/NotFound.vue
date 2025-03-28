<script setup lang="ts">
interface NotFound {
    title: string
    description: string
}

defineProps<NotFound>()
</script>

<template>
    <div class="not_found">
        <slot name="image" />
        <h1 class="not_found_title">
            {{ title }}
        </h1>
        <p class="not_found_description">
            {{ description }}
        </p>
        <div class="not_found_button_group">
            <slot name="buttons" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.not_found {
  @apply flex flex-col items-center px-4 justify-center;

  &_title {
    @apply text-bodyL text-primary mt-[9.83px] text-center font-semibold leading-9;
  }

  &_description {
    @apply text-text-secondary text-bodyM text-center mt-2 leading-6
  }

  &_button_group {
    @apply gap-3 mt-[23px] flex items-center;
  }

  .icon {
    @apply w-5 h-5
  }
}
</style>
