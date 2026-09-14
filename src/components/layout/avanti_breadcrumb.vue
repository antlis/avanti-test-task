<script setup lang="ts">
export interface Crumb {
  label: string
  current?: boolean
}

defineProps<{ items: Crumb[] }>()
</script>

<template>
  <nav class="breadcrumb" aria-label="breadcrumb">
    <template v-for="(item, index) in items" :key="index">
      <span v-if="index > 0" class="breadcrumb__sep">/</span>
      <span
        class="breadcrumb__item"
        :class="{ 'breadcrumb__item--current': item.current }"
        :aria-current="item.current ? 'page' : undefined"
      >
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: $space-2;
  font-size: 14px;
  font-weight: $fw-medium;

  &__sep {
    color: $color-text-muted;
  }

  &__item {
    color: $color-text;

    &--current {
      color: $color-text-strong;
      font-weight: $fw-semibold;
    }
  }
}
</style>
