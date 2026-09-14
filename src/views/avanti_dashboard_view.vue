<script setup lang="ts">
import AvantiHeader from '@/components/layout/avanti_header.vue'
import AvantiPageBar from '@/components/layout/avanti_page_bar.vue'
import AvantiBottomNav from '@/components/layout/avanti_bottom_nav.vue'

// Page content will move to the Pinia store in Round 2; literals for now.
const user = {
  name: 'Marco Rossi',
  email: 'ikoei@09gmail.com',
  avatar: '/assets/avatar-marco.png'
}
const breadcrumb = [
  { label: 'Piattaforma', to: '/' },
  { label: 'Home', current: true }
]
</script>

<template>
  <div class="dashboard">
    <AvantiHeader :user="user" :notification-count="4" />
    <AvantiPageBar :user="user" :breadcrumb="breadcrumb" />

    <main class="dashboard__body">
      <!-- Content sections are added in the following rounds. -->
    </main>

    <AvantiBottomNav />
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  min-height: 100dvh;
  background: $color-bg;

  &__body {
    @include container;
    // Reserve space for the fixed mobile bottom nav (62px + breathing room).
    padding-bottom: 86px;

    @include desktop {
      padding-bottom: $space-10;
    }
  }
}
</style>
