<script setup lang="ts">
import AvantiIcon from '@/components/avanti_icon.vue'
import type { ChecklistItem } from '@/types/checklist'

defineProps<ChecklistItem>()
const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    class="citem"
    :class="{ 'citem--active': state === 'active', 'citem--pending': state === 'pending' }"
    @click="emit('select')"
  >
    <span class="citem__badge">
      <AvantiIcon :name="icon" :size="22" />
    </span>

    <div class="citem__text">
      <p class="citem__title">{{ title }}</p>
      <p class="citem__subtitle">{{ subtitle }}</p>
    </div>

    <span class="citem__check">
      <AvantiIcon name="check" :size="16" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.citem {
  display: flex;
  align-items: center;
  gap: $space-4;
  width: 100%;
  padding-block: $space-4;
  padding-inline: 0;
  text-align: left;
  background: none;
  border: none;
  border-radius: $radius-md;
  cursor: pointer;

  &:focus-visible {
    @include focus-ring;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    color: $color-surface;
    background: $color-primary;
    border-radius: $radius-pill;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__title {
    font-size: rem(14);
    font-weight: $fw-bold;
    color: $color-text-strong;
  }

  &__subtitle {
    font-size: rem(11);
    font-weight: $fw-medium;
    color: $color-primary;
  }

  // Current step: semibold subtitle.
  &--active &__subtitle {
    font-weight: $fw-semibold;
  }

  &__check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    margin-left: auto;
    color: $color-surface;
    background: $color-primary;
    border-radius: $radius-pill;
  }

  // Pending step: muted text (badge + check stay teal).
  &--pending {
    .citem__title {
      font-weight: $fw-medium;
      color: $color-text;
    }

    .citem__subtitle {
      font-weight: $fw-regular;
      color: $color-text-muted;
    }
  }
}
</style>
