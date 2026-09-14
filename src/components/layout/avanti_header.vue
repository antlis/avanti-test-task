<script setup lang="ts">
import { ref } from 'vue'

import AvantiIcon from '@/components/ui/avanti_icon.vue'
import AvantiBadge from '@/components/ui/avanti_badge.vue'
import AvantiNavMenu, { type NavItem } from '@/components/layout/avanti_nav_menu.vue'

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

      <button type="button" class="header__assistenza">
        <AvantiIcon name="chat" :size="18" />
        <span class="header__assistenza-label">Assistenza</span>
        <AvantiBadge
          v-if="assistenzaCount > 0"
          variant="count"
          tone="danger"
          class="header__assistenza-badge"
        >
          {{ assistenzaCount }}
        </AvantiBadge>
      </button>
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
      gap: 52px;
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
    color: #000000;
  }

  // Menu is hidden on small screens; the mobile bottom nav replaces it (Round 5).
  &__nav {
    display: none;

    @include desktop {
      display: flex;
    }
  }

  &__assistenza {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3 $space-3;
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
  }

  &__assistenza-label {
    display: none;
    font-size: 16px;
    text-transform: uppercase;

    @include tablet {
      display: inline;
    }
  }

  &__assistenza-badge {
    position: absolute;
    top: -10px;
    right: -8px;
    border: 2px solid $color-surface;
  }
}
</style>
