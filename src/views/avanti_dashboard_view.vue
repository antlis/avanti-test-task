<script setup lang="ts">
import AvantiHeader from '@/components/layout/avanti_header.vue'
import AvantiPageBar from '@/components/layout/avanti_page_bar.vue'

// Page content will move to the Pinia store in Round 2; literals for now.
const user = {
  name: 'Marco Rossi',
  email: 'ikoei@09gmail.com',
  avatar: '/assets/avatar-marco.png'
}
const breadcrumb = [{ label: 'Piattaforma' }, { label: 'Home', current: true }]
</script>

<template>
  <div class="dashboard">
    <AvantiHeader :assistenza-count="4" />
    <AvantiPageBar :user="user" :breadcrumb="breadcrumb" />

    <main class="dashboard__body">
      <!-- Content sections are added in the following rounds. -->
    </main>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  min-height: 100dvh;
  background: $color-bg;

  &__body {
    @include container;
    padding-bottom: $space-10;
  }
}
</style>
