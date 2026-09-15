<script setup lang="ts">
withDefaults(defineProps<{ total: number; completed: number }>(), {})
</script>

<template>
  <div
    class="segments"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuenow="completed"
    :aria-valuemax="total"
  >
    <span
      v-for="n in total"
      :key="n"
      class="segments__seg"
      :class="{ 'segments__seg--on': n <= completed }"
    />
  </div>
</template>

<style lang="scss" scoped>
.segments {
  display: flex;
  gap: $space-2;

  &__seg {
    flex: 1 1 0;
    height: 4px;
    background: $color-border;
    border-radius: $radius-pill;

    &--on {
      background: $color-primary;
    }
  }
}
</style>
