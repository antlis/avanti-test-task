<script setup lang="ts">
export interface Crumb {
  label: string
  to?: string
  current?: boolean
}

defineProps<{ items: Crumb[] }>()
</script>

<template>
  <nav class="breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb__list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb__item">
        <span v-if="index > 0" class="breadcrumb__sep" aria-hidden="true">/</span>
        <RouterLink
          v-if="item.to && !item.current"
          :to="item.to"
          class="breadcrumb__link"
        >
          {{ item.label }}
        </RouterLink>
        <span
          v-else
          class="breadcrumb__current"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumb {
  font-size: 14px;
  font-weight: $fw-medium;

  &__list {
    display: flex;
    align-items: center;
  }

  &__item {
    display: inline-flex;
    align-items: center;
  }

  &__sep {
    margin: 0 $space-2;
    color: $color-text-muted;
  }

  &__link {
    color: $color-text;
    border-radius: $radius-sm;
    transition: color 0.15s ease;

    &:hover {
      color: $color-primary;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  &__current {
    color: $color-text-strong;
    font-weight: $fw-semibold;
  }
}
</style>
