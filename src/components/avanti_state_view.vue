<script setup lang="ts">
// Minimal loading / error gate for async sections. Renders the default slot
// once data is ready, otherwise a status message with an optional retry.
defineProps<{ loading?: boolean; error?: boolean }>()
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <p v-if="loading" class="state state--loading" role="status" aria-live="polite">
    Caricamento…
  </p>
  <div v-else-if="error" class="state state--error" role="alert" aria-live="assertive">
    <p>Impossibile caricare i dati.</p>
    <button type="button" class="state__retry" @click="emit('retry')">
      Riprova
    </button>
  </div>
  <slot v-else />
</template>

<style lang="scss" scoped>
.state {
  padding: $space-10 $space-4;
  text-align: center;
  color: $color-text-muted;

  &--error {
    color: $color-text;
  }

  &__retry {
    margin-top: $space-3;
    padding: $space-2 $space-4;
    font-weight: $fw-semibold;
    color: $color-primary;
    background: $color-primary-tint;
    border: none;
    border-radius: $radius-pill;
    cursor: pointer;
  }
}
</style>
