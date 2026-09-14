<script setup lang="ts">
import AvantiAvatar from '@/components/avanti_avatar.vue'

defineProps<{ name: string; email: string; avatar?: string }>()
</script>

<template>
  <div class="user-summary">
    <AvantiAvatar :src="avatar" :alt="name" size="md" />
    <div class="user-summary__info">
      <span class="user-summary__name">{{ name }}</span>
      <span class="user-summary__email">{{ email }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-summary {
  display: flex;
  align-items: center;
  gap: $space-3;

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: 14px;
    font-weight: $fw-semibold;
    color: $color-text-strong;
  }

  &__email {
    font-size: 12px;
    color: $color-text;
  }
}
</style>
