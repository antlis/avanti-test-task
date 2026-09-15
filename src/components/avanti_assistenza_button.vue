<script setup lang="ts">
import AvantiIcon from '@/components/avanti_icon.vue'
import AvantiBadge from '@/components/avanti_badge.vue'

withDefaults(
  defineProps<{
    // bar = desktop header (horizontal, with counter); tab = mobile bottom nav.
    variant?: 'bar' | 'tab'
    count?: number
  }>(),
  { variant: 'bar', count: 0 }
)
</script>

<template>
  <button type="button" class="assistenza" :class="`assistenza--${variant}`">
    <AvantiIcon name="chat" :size="variant === 'tab' ? 16 : 18" />
    <span class="assistenza__label">Assistenza</span>
    <AvantiBadge
      v-if="variant === 'bar' && count > 0"
      variant="count"
      tone="danger"
      class="assistenza__badge"
    >
      {{ count }}
    </AvantiBadge>
  </button>
</template>

<style lang="scss" scoped>
.assistenza {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: $color-primary;
  color: $color-surface;
  font-weight: $fw-semibold;
  text-transform: uppercase;
  border-radius: $radius-sm;
  transition: background 0.15s ease;

  &:hover {
    background: $color-primary-dark;
  }

  &:focus-visible {
    @include focus-ring;
  }

  // Desktop header: horizontal, with notification badge.
  &--bar {
    gap: $space-3;
    padding: 10px $space-3;
    font-size: rem(16);
  }

  // Mobile bottom nav: vertical tab, no badge.
  &--tab {
    flex-direction: column;
    gap: $space-1;
    height: 43px; // Figma: filled tab height
    padding: 4px $space-4;
    font-size: rem(12);

    // Very narrow phones: icon-only to match the other tabs.
    @include narrow {
      .assistenza__label {
        display: none;
      }
    }
  }

  &__label {
    white-space: nowrap;
  }

  &__badge {
    position: absolute;
    top: -10px;
    right: -8px;
    border: 2px solid $color-surface;
  }
}
</style>
