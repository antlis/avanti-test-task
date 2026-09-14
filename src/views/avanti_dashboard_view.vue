<script setup lang="ts">
// Dashboard screen. Components are added and reviewed incrementally —
// this placeholder is only the mount point for the app shell.
</script>

<template>
  <main class="dashboard">
    <p class="dashboard__placeholder">Avanti · Area personale — in sviluppo</p>
  </main>
</template>

<style lang="scss" scoped>
.dashboard {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: $space-6;

  &__placeholder {
    color: $color-text-muted;
    font-weight: $fw-medium;
  }
}
</style>
