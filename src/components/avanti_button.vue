<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'solid' | 'gradient'
    size?: 'md' | 'compact'
    block?: boolean
    uppercase?: boolean
    disabled?: boolean
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'solid',
    size: 'md',
    block: false,
    uppercase: false,
    disabled: false,
    type: 'button'
  }
)
</script>

<template>
  <button
    :type="type"
    class="btn"
    :class="[
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--block': block, 'btn--uppercase': uppercase }
    ]"
    :disabled="disabled"
  >
    <span v-if="$slots.leading" class="btn__slot"><slot name="leading" /></span>
    <span class="btn__label"><slot /></span>
    <span v-if="$slots.trailing" class="btn__slot"><slot name="trailing" /></span>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: $radius-sm;
  color: $color-surface;
  font-weight: $fw-semibold;
  font-size: 16px;
  line-height: 20px;
  transition: box-shadow 0.15s ease;

  &--md {
    gap: $space-2;
    padding: $space-3 $space-4;
  }

  &--compact {
    gap: $space-3;
    padding: 10px $space-3;
  }

  &--block {
    width: 100%;
  }

  &--uppercase {
    text-transform: uppercase;
  }

  &--solid {
    background: $color-primary;
    box-shadow: $shadow-2xs;
  }

  &--gradient {
    background: $gradient-primary;
    box-shadow: $shadow-2xs;
  }

  // Hover (from Figma "Кнопка действия" Variant2): teal glow.
  &:not(:disabled):hover {
    box-shadow: $shadow-glow;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    @include focus-ring;
  }

  &__slot {
    display: inline-flex;
  }

  &__label {
    white-space: nowrap;
  }
}
</style>
