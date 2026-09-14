<script setup lang="ts">
import { ref } from 'vue'

import AvantiIcon from '@/components/ui/avanti_icon.vue'
import { mainNavItems } from '@/config/navigation'

// Highlighted page; a router would drive this in a multi-screen app.
const active = ref('home')
</script>

<template>
  <nav class="bottom-nav" aria-label="Navigazione principale">
    <button
      v-for="item in mainNavItems"
      :key="item.key"
      type="button"
      class="bottom-nav__item"
      :class="{ 'bottom-nav__item--active': item.key === active }"
      @click="active = item.key"
    >
      <AvantiIcon :name="item.icon" :size="20" />
      <span class="bottom-nav__label">{{ item.label }}</span>
    </button>

    <button type="button" class="bottom-nav__assistenza">
      <AvantiIcon name="chat" :size="16" />
      <span class="bottom-nav__label">Assistenza</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  inset: auto 0 0 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $bottom-nav-height;
  padding: 0 $space-5;
  background: $color-surface;
  border-top: 2px solid $color-primary;

  // Desktop uses the header menu instead.
  @include desktop {
    display: none;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-1;
    color: $color-text-strong;
    font-size: 14px;
    font-weight: $fw-medium;

    &--active {
      color: $color-primary;
      font-weight: $fw-semibold;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  &__assistenza {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-1;
    height: 43px; // Figma: filled tab height
    padding: 4px $space-4;
    border-radius: $radius-sm;
    background: $color-primary;
    color: $color-surface;
    font-size: 12px;
    font-weight: $fw-semibold;
    text-transform: uppercase;
    transition: background 0.15s ease;

    &:hover {
      background: $color-primary-dark;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  &__label {
    white-space: nowrap;
  }
}
</style>
