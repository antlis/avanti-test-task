<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import AvantiHeader from '@/components/avanti_header.vue'
import AvantiPageBar from '@/components/avanti_page_bar.vue'
import AvantiBottomNav from '@/components/avanti_bottom_nav.vue'
import AvantiBalanceCard from '@/components/avanti_balance_card.vue'
import AvantiProcessCard from '@/components/avanti_process_card.vue'
import AvantiChecklistCard from '@/components/avanti_checklist_card.vue'
import AvantiChatPopup from '@/components/avanti_chat_popup.vue'
import AvantiStateView from '@/components/avanti_state_view.vue'
import { useProfileStore } from '@/stores/profile'
import { useDashboardStore } from '@/stores/dashboard'

const breadcrumb = [
  { label: 'Piattaforma', to: '/' },
  { label: 'Home', current: true }
]

const profileStore = useProfileStore()
const dashboardStore = useDashboardStore()
const { profile, notifications } = storeToRefs(profileStore)
const { balance, process, checklist, assistant } = storeToRefs(dashboardStore)

onMounted(() => {
  profileStore.load()
  dashboardStore.load()
})
</script>

<template>
  <div class="dashboard">
    <AvantiHeader
      v-if="profile"
      :user="profile"
      :assistenza-count="notifications.assistenza"
      :bell-count="notifications.bell"
    />
    <AvantiPageBar v-if="profile" :user="profile" :breadcrumb="breadcrumb" />

    <main class="dashboard__body">
      <AvantiStateView
        :loading="dashboardStore.isLoading"
        :error="dashboardStore.isError"
        @retry="dashboardStore.reload"
      >
        <div v-if="balance" class="dashboard__content">
          <div class="dashboard__left">
            <AvantiBalanceCard
              :label="balance.label"
              :sublabel="balance.sublabel"
              :status="balance.status"
              :amount="balance.amount"
              :currency="balance.currency"
              :product="balance.product"
              :tan="balance.tan"
              :footnote="balance.footnote"
            />
            <AvantiProcessCard
              title="Sblocco dei&#10;fondi completato"
              :steps="process"
            />
          </div>
          <div class="dashboard__right">
            <AvantiChecklistCard
              title="Fondi pronti per il&#10;prelievo - procedi ora!"
              :items="checklist"
              @select="dashboardStore.setActiveStep"
            />
          </div>
        </div>
      </AvantiStateView>
    </main>

    <AvantiChatPopup
      v-if="assistant"
      class="dashboard__chat"
      :name="assistant.name"
      :message="assistant.message"
      :avatar="assistant.avatar"
      :unread="assistant.unread"
    />

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

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-6;
    padding-top: $space-4;

    @include desktop {
      flex-direction: row;
      gap: $space-10;
      padding-top: $space-5;
    }
  }

  // Columns share the row fluidly, keeping the Figma 792:464 proportion
  &__left {
    display: flex;
    flex-direction: column;
    gap: $space-6;

    @include desktop {
      flex: 792 1 0;
      min-width: 0;
      gap: $space-8;
    }
  }

  // Floating assistant popup — pinned bottom-right on every breakpoint.
  // On mobile it sits just above the fixed bottom nav.
  &__chat {
    position: fixed;
    right: $space-4;
    bottom: calc(#{$bottom-nav-height} + #{$space-4});
    z-index: 20;

    @include desktop {
      right: $space-10;
      bottom: $space-10;
    }
  }

  // Right column (checklist) is desktop-only; the mobile design omits it.
  &__right {
    display: none;

    @include desktop {
      display: flex;
      flex-direction: column;
      gap: $space-6;
      flex: 464 1 0;
      min-width: 0;
    }
  }
}
</style>
