<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ src?: string; alt?: string; size?: 'md' | 'lg' }>(),
  { alt: '', size: 'md' }
)

const initials = computed(() =>
  props.alt
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
)
</script>

<template>
  <span class="avatar" :class="`avatar--${size}`">
    <img v-if="src" :src="src" :alt="alt" class="avatar__img" />
    <span v-else class="avatar__initials">{{ initials }}</span>
  </span>
</template>

<style lang="scss" scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: $radius-pill;
  background: $color-primary-tint;
  color: $color-primary;
  font-weight: $fw-semibold;

  &--md {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }

  &--lg {
    width: 60px;
    height: 60px;
    font-size: 20px;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
