<script setup lang="ts">
import { RouterLink } from 'vue-router'

import AvantiIcon from '@/components/avanti_icon.vue'
import type { IconName } from '@/components/icon_names'

withDefaults(
  defineProps<{
    icon: IconName
    label: string
    to?: string
    active?: boolean
    variant?: 'pill' | 'tab'
    iconSize?: number
  }>(),
  { active: false, variant: 'pill', iconSize: 20 }
)
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :type="to ? undefined : 'button'"
    class="nav-button"
    :class="[`nav-button--${variant}`, { 'nav-button--active': active }]"
  >
    <AvantiIcon :name="icon" :size="iconSize" />
    <span class="nav-button__label">{{ label }}</span>
  </component>
</template>

<style lang="scss" scoped>
.nav-button {
  display: inline-flex;
  align-items: center;
  color: $color-text-strong;
  font-size: rem(14);
  font-weight: $fw-medium;
  transition: background 0.15s ease, color 0.15s ease;

  &__label {
    white-space: nowrap;
  }

  // Horizontal pill — desktop header menu.
  &--pill {
    gap: $space-3;
    padding: 10px $space-3;
    border: 1px solid $color-primary-tint;
    border-radius: $radius-sm;
    background: $color-bg;

    &:hover {
      background: $color-primary-tint;
    }
  }

  // Vertical tab — mobile bottom nav.
  &--tab {
    flex-direction: column;
    justify-content: center;
    gap: $space-1;
  }

  &--active {
    color: $color-primary;

    .nav-button__label {
      font-weight: $fw-semibold;
    }
  }

  // Active pill gets the tinted fill instead of the outline.
  &--pill#{&}--active {
    background: $color-primary-tint;
    border-color: transparent;
  }

  &:focus-visible {
    @include focus-ring;
  }
}
</style>
