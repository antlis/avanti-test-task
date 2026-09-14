<script setup lang="ts">
import { ref } from 'vue'

import AvantiIcon from '@/components/avanti_icon.vue'
import AvantiBadge from '@/components/avanti_badge.vue'
import AvantiAvatar from '@/components/avanti_avatar.vue'
import AvantiNavMenu from '@/components/avanti_nav_menu.vue'
import AvantiAssistenzaButton from '@/components/avanti_assistenza_button.vue'
import { mainNavItems } from '@/config/navigation'

interface HeaderUser {
  name: string
  email: string
  avatar?: string
}

withDefaults(
  defineProps<{ user: HeaderUser; notificationCount?: number }>(),
  { notificationCount: 0 }
)

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

        <div class="header__nav">
          <AvantiNavMenu :items="mainNavItems" :active="active" @select="active = $event" />
        </div>
      </div>

      <!-- Desktop: full Assistenza button -->
      <div class="header__assistenza">
        <AvantiAssistenzaButton :count="notificationCount" />
      </div>

      <!-- Mobile: notification bell + avatar -->
      <div class="header__mobile">
        <button type="button" class="header__bell" aria-label="Notifiche">
          <AvantiIcon name="bell" :size="24" />
          <AvantiBadge
            v-if="notificationCount > 0"
            variant="count"
            tone="danger"
            class="header__bell-badge"
          >
            {{ notificationCount }}
          </AvantiBadge>
        </button>
        <AvantiAvatar :src="user.avatar" :alt="user.name" size="md" />
      </div>
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
    padding-block: $space-3;

    @include desktop {
      padding-block: $space-4;
    }
  }

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
    gap: $space-2;
    border-radius: $radius-sm;
    transition: opacity 0.15s ease;

    @include desktop {
      gap: $space-3;
    }

    &:hover {
      opacity: 0.85;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  &__logo {
    width: 36px;
    height: auto;

    @include desktop {
      width: 48px;
    }
  }

  &__wordmark {
    font-size: 24px;
    line-height: 1;
    font-weight: $fw-bold;
    letter-spacing: -0.05em;
    color: $color-wordmark;

    @include desktop {
      font-size: 32px;
    }
  }

  // Desktop-only nav menu + Assistenza button.
  &__nav,
  &__assistenza {
    display: none;

    @include desktop {
      display: flex;
    }
  }

  // Mobile-only bell + avatar.
  &__mobile {
    display: flex;
    align-items: center;
    gap: $space-3;

    @include desktop {
      display: none;
    }
  }

  &__bell {
    position: relative;
    display: inline-flex;
    color: $color-text-strong;
    border-radius: $radius-sm;

    &:focus-visible {
      @include focus-ring;
    }
  }

  &__bell-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    border: 2px solid $color-surface;
  }
}
</style>
