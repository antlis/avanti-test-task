<script setup lang="ts">
import { computed } from 'vue'

import { iconPaths, type IconName } from './avanti_icon_paths'

const props = withDefaults(defineProps<{ name: IconName; size?: number }>(), {
  size: 20
})

const paths = computed(() => iconPaths[props.name])
</script>

<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, index) in paths" :key="index" :d="d" />
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  display: block;
  flex-shrink: 0;
}
</style>
