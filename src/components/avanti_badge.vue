<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'count' | 'pill'
    tone?: 'danger' | 'primary' | 'neutral' | 'on-primary'
  }>(),
  { variant: 'pill', tone: 'primary' }
)
</script>

<template>
  <span class="badge" :class="[`badge--${variant}`, `badge--${tone}`]">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: $fw-bold;
  line-height: 1;
  white-space: nowrap;

  &--pill {
    padding: 4px 10px;
    border-radius: $radius-pill;
    font-size: rem(11);
  }

  &--count {
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    border-radius: $radius-pill;
    font-size: rem(11);
  }

  &--danger {
    background: $color-danger;
    color: $color-surface;
  }

  &--primary {
    background: $color-primary-tint;
    color: $color-primary;
  }

  &--neutral {
    background: $color-border-soft;
    color: $color-text;
  }

  &--on-primary {
    background: rgba(#ffffff, 0.2);
    color: $color-surface;
  }
}
</style>
