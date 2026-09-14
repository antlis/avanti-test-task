<script setup lang="ts">
import AvantiIcon from '@/components/ui/avanti_icon.vue'
import AvantiBadge from '@/components/ui/avanti_badge.vue'

withDefaults(defineProps<{ count?: number }>(), { count: 0 })
</script>

<template>
  <button type="button" class="assistenza">
    <AvantiIcon name="chat" :size="18" />
    <span class="assistenza__label">Assistenza</span>
    <AvantiBadge
      v-if="count > 0"
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
  gap: $space-3;
  padding: $space-3;
  border-radius: $radius-sm;
  background: $color-primary;
  color: $color-surface;
  font-weight: $fw-semibold;
  transition: background 0.15s ease;

  &:hover {
    background: $color-primary-dark;
  }

  &:focus-visible {
    @include focus-ring;
  }

  &__label {
    display: none;
    font-size: 16px;
    text-transform: uppercase;

    @include tablet {
      display: inline;
    }
  }

  &__badge {
    position: absolute;
    top: -10px;
    right: -8px;
    border: 2px solid $color-surface;
  }
}
</style>
