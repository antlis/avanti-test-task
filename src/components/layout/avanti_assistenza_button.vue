<script setup lang="ts">
import AvantiButton from '@/components/ui/avanti_button.vue'
import AvantiIcon from '@/components/ui/avanti_icon.vue'
import AvantiBadge from '@/components/ui/avanti_badge.vue'

withDefaults(defineProps<{ count?: number }>(), { count: 0 })
</script>

<template>
  <div class="assistenza">
    <AvantiButton size="compact" uppercase>
      <template #leading>
        <AvantiIcon name="chat" :size="18" />
      </template>
      Assistenza
    </AvantiButton>
    <AvantiBadge
      v-if="count > 0"
      variant="count"
      tone="danger"
      class="assistenza__badge"
    >
      {{ count }}
    </AvantiBadge>
  </div>
</template>

<style lang="scss" scoped>
.assistenza {
  position: relative;
  display: inline-flex;

  &__badge {
    position: absolute;
    top: -10px;
    right: -8px;
    z-index: 1;
    border: 2px solid $color-surface;
  }
}
</style>
