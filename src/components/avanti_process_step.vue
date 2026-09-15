<script setup lang="ts">
import AvantiIcon from '@/components/avanti_icon.vue'
import type { ProcessStep } from '@/types/process'

defineProps<ProcessStep>()
</script>

<template>
  <div class="step">
    <span class="step__badge" :class="{ 'step__badge--active': active }">
      <AvantiIcon :name="icon" :size="24" />
    </span>
    <p class="step__title">{{ title }}</p>
    <p class="step__desc">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    color: $color-primary;
    border: 2px solid $color-primary;
    border-radius: $radius-pill;
    background: $color-surface;

    // Current step pops with a teal halo (Figma spec).
    &--active {
      box-shadow: 0 0 15.39px $color-primary;
    }
  }

  &__title {
    margin-top: $space-3;
    font-size: rem(11);
    font-weight: $fw-bold;
    color: $color-text-strong;

    @include desktop {
      font-size: rem(20);
    }
  }

  &__desc {
    max-width: 22ch;
    margin-top: $space-2;
    font-size: rem(9);
    line-height: 1.4;
    color: $color-text-muted;

    @include desktop {
      font-size: rem(16);
    }
  }
}
</style>
