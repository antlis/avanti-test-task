<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{ src?: string; alt?: string; size?: 'sm' | 'md' | 'lg' }>(),
  { alt: '', size: 'md' }
)

const failed = ref(false)
const showImage = computed(() => Boolean(props.src) && !failed.value)

// Retry the image when the source changes after a previous failure.
watch(
  () => props.src,
  () => {
    failed.value = false
  }
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
    <img
      v-if="showImage"
      :src="src"
      :alt="alt"
      class="avatar__img"
      @error="failed = true"
    />
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

  &--sm {
    width: 32px;
    height: 32px;
    font-size: rem(12);
  }

  &--md {
    width: 40px;
    height: 40px;
    font-size: rem(14);
  }

  &--lg {
    width: 60px;
    height: 60px;
    font-size: rem(20);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
