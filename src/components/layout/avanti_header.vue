<script setup lang="ts">
import { ref } from 'vue'

import AvantiNavMenu, { type NavItem } from '@/components/layout/avanti_nav_menu.vue'
import AvantiAssistenzaButton from '@/components/layout/avanti_assistenza_button.vue'

withDefaults(defineProps<{ assistenzaCount?: number }>(), { assistenzaCount: 0 })

// App-level navigation is static, not server data.
const navItems: NavItem[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'documenti', label: 'Documenti', icon: 'document' },
  { key: 'profilo', label: 'Profilo', icon: 'profile' }
]
const active = ref('home')
</script>

<template>
  <header class="header">
    <div class="header__bar">
      <div class="header__inner">
        <RouterLink to="/" class="header__brand" aria-label="Avanti — home">
          <img class="header__logo" src="/assets/avanti-logo.svg" alt="" />
          <span class="header__wordmark">Avanti</span>
        </RouterLink>

        <AvantiNavMenu
          class="header__nav"
          :items="navItems"
          :active="active"
          @select="active = $event"
        />
      </div>

      <AvantiAssistenzaButton :count="assistenzaCount" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background: $color-surface;
  border-bottom: 1px solid $color-border;

  // Full-bleed bar; content column capped at the Figma design width.
  &__bar {
    @include container;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-4;
    padding-block: $space-4;
  }

  // Logo + menu group, with the nav row's vertical breathing space.
  &__inner {
    display: flex;
    align-items: center;
    gap: $space-4;

    @include desktop {
      gap: 52px; // Figma spacing between logo and nav menu
      padding: $space-5 0;
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: $space-3;
    border-radius: $radius-sm;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.85;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  &__logo {
    width: 48px;
    height: auto;
  }

  &__wordmark {
    font-size: 32px;
    line-height: 1;
    font-weight: $fw-bold;
    letter-spacing: -0.05em;
    color: $color-wordmark;
  }

  // Menu is hidden on small screens; the mobile bottom nav replaces it (Round 5).
  &__nav {
    display: none;

    @include desktop {
      display: flex;
    }
  }
}
</style>
