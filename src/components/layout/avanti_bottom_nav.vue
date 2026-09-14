<script setup lang="ts">
import { ref } from 'vue'

import AvantiNavButton from '@/components/ui/avanti_nav_button.vue'
import AvantiAssistenzaButton from '@/components/layout/avanti_assistenza_button.vue'
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

    <AvantiAssistenzaButton variant="tab" />
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
}
</style>
