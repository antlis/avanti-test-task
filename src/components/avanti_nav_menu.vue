<script setup lang="ts">
import { useRoute } from 'vue-router'

import AvantiNavButton from '@/components/avanti_nav_button.vue'
import type { NavItem } from '@/types/navigation'

defineProps<{ items: NavItem[] }>()

const route = useRoute()
</script>

<template>
  <nav class="nav-menu">
    <AvantiNavButton
      v-for="item in items"
      :key="item.key"
      class="nav-menu__item"
      variant="pill"
      :icon="item.icon"
      :label="item.label"
      :to="item.to"
      :active="route.path === item.to"
      :icon-size="18"
    />
  </nav>
</template>

<style lang="scss" scoped>
.nav-menu {
  display: flex;
  align-items: center;
  gap: $space-3;
  width: 660px; // Figma nav-menu zone width
  max-width: 100%;

  // Items share the zone width equally.
  &__item {
    flex: 1 1 0;
  }
}
</style>
