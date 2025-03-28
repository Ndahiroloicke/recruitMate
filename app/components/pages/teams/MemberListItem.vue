<script setup lang="ts">
interface Props {
  name: string
  email: string
  role: 'Member' | 'Admin'
  avatar: string
}

defineProps<Props>()

const emit = defineEmits(['edit'])
</script>

<template>
  <div class="member-item">
    <div class="member-item__info">
      <img :src="avatar" :alt="name" class="member-item__avatar" />
      <div class="member-item__details">
        <h3 class="member-item__name">{{ name }}</h3>
        <p class="member-item__email">{{ email }}</p>
      </div>
    </div>
    <div class="member-item__actions">
      <span class="member-item__role">{{ role }}</span>
      <Button variant="ghost" class="member-item__edit" @click="emit('edit')">
        Edit <Icon name="ri:arrow-right-s-line" />
      </Button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.member-item {
  @apply flex items-center justify-between py-4 px-6 border-b border-[#E9EAEC] last:border-b-0;

  &__info {
    @apply flex items-center gap-3;
  }

  &__avatar {
    @apply w-10 h-10 rounded-full object-cover;
  }

  &__details {
    @apply flex flex-col;
  }

  &__name {
    @apply text-sm font-medium text-[#0A0F29];
  }

  &__email {
    @apply text-sm text-[#6C7275];
  }

  &__actions {
    @apply flex items-center gap-4;
  }

  &__role {
    @apply text-sm text-[#6C7275];
  }

  &__edit {
    @apply text-[#4B48EC] flex items-center gap-1 hover:bg-[#4B48EC]/5;
  }
}
</style> 