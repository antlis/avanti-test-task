<script setup lang="ts">
import AvantiHeader from '@/components/avanti_header.vue'
import AvantiPageBar from '@/components/avanti_page_bar.vue'
import AvantiBottomNav from '@/components/avanti_bottom_nav.vue'

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
    // Clear the fixed mobile bottom nav + breathing room.
    padding-bottom: calc(#{$bottom-nav-height} + #{$space-6});

    @include desktop {
      padding-bottom: $space-10;
    }
  }
}
</style>
