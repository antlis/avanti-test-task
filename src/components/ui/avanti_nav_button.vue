<script setup lang="ts">
import AvantiIcon from '@/components/ui/avanti_icon.vue'
import type { IconName } from '@/components/ui/icon_names'

withDefaults(
  defineProps<{
    icon: IconName
    label: string
    active?: boolean
    variant?: 'pill' | 'tab'
    filled?: boolean
    iconSize?: number
  }>(),
  { active: false, variant: 'pill', filled: false, iconSize: 20 }
)
</script>

<template>
  <button
    type="button"
    class="nav-button"
    :class="[
      `nav-button--${variant}`,
      { 'nav-button--active': active, 'nav-button--filled': filled }
    ]"
  >
    <AvantiIcon :name="icon" :size="iconSize" />
    <span class="nav-button__label">{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.nav-button {
  display: inline-flex;
  align-items: center;
  color: $color-text-strong;
  font-size: 14px;
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

  // Filled tab — the highlighted "Assistenza" entry in the bottom nav.
  &--filled {
    height: 43px; // Figma: filled tab height
    padding: 4px $space-4;
    border-radius: $radius-sm;
    background: $color-primary;
    color: $color-surface;
    font-size: 12px;
    font-weight: $fw-semibold;
    text-transform: uppercase;

    &:hover {
      background: $color-primary-dark;
    }
  }

  &:focus-visible {
    @include focus-ring;
  }
}
</style>
