<script setup lang="ts">
import { ref } from 'vue'

import AvantiNavButton from '@/components/ui/avanti_nav_button.vue'
import AvantiIcon from '@/components/ui/avanti_icon.vue'
import { mainNavItems } from '@/config/navigation'

// Highlighted page; a router would drive this in a multi-screen app.
const active = ref('home')
</script>

<template>
  <nav class="bottom-nav" aria-label="Navigazione principale">
    <AvantiNavButton
      v-for="item in mainNavItems"
      :key="item.key"
      variant="tab"
      :icon="item.icon"
      :label="item.label"
      :active="item.key === active"
      @click="active = item.key"
    />

    <button type="button" class="bottom-nav__assistenza">
      <AvantiIcon name="chat" :size="16" />
      <span>Assistenza</span>
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

  // Filled "Assistenza" tab — distinct from the plain nav tabs.
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
    white-space: nowrap;
    transition: background 0.15s ease;

    &:hover {
      background: $color-primary-dark;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }
}
</style>
