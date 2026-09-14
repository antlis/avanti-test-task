<script setup lang="ts">
import AvantiIcon from '@/components/ui/avanti_icon.vue'
import type { IconName } from '@/components/ui/icon_names'

export interface NavItem {
  key: string
  label: string
  icon: IconName
}

defineProps<{ items: NavItem[]; active: string }>()
const emit = defineEmits<{ select: [key: string] }>()
</script>

<template>
  <nav class="nav-menu">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      class="nav-menu__item"
      :class="{ 'nav-menu__item--active': item.key === active }"
      @click="emit('select', item.key)"
    >
      <AvantiIcon :name="item.icon" :size="18" />
      <span class="nav-menu__label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.nav-menu {
  display: flex;
  align-items: center;
  gap: $space-3;
  width: 660px; // Figma nav-menu zone width
  max-width: 100%;

  &__item {
    flex: 1 1 0;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: $space-3;
    padding: 10px $space-3; // 10px vertical per Figma
    border: 1px solid $color-primary-tint;
    border-radius: $radius-sm;
    background: $color-bg;
    color: $color-text-strong;
    font-size: 14px;
    font-weight: $fw-medium;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
      background: $color-primary-tint;
    }

    &--active {
      background: $color-primary-tint;
      border-color: transparent;
      color: $color-primary;

      .nav-menu__label {
        font-weight: $fw-semibold;
      }
    }

    &:focus-visible {
      @include focus-ring;
    }
  }
}
</style>
