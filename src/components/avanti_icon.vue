<script setup lang="ts">
import { computed, type Component } from 'vue'

import type { IconName } from './icon_names'

// Every SVG in the icons directory becomes available by filename.
// `eager` inlines all icon components into this chunk at build time (no async
// fetch at runtime); the set is small so the bundle cost is negligible.
const modules = import.meta.glob<Component>('../assets/icons/*.svg', {
  query: '?component',
  import: 'default',
  eager: true
})

const icons = Object.fromEntries(
  Object.entries(modules).map(([path, component]) => [
    path.split('/').pop()!.replace('.svg', ''),
    component
  ])
) as Record<IconName, Component>

const props = withDefaults(defineProps<{ name: IconName; size?: number }>(), {
  size: 20
})

const icon = computed(() => icons[props.name])
</script>

<template>
  <component :is="icon" class="icon" :width="size" :height="size" />
</template>

<style lang="scss" scoped>
.icon {
  display: block;
  flex-shrink: 0;
}
</style>
