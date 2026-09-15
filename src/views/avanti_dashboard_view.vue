<script setup lang="ts">
import AvantiHeader from '@/components/avanti_header.vue'
import AvantiPageBar from '@/components/avanti_page_bar.vue'
import AvantiBottomNav from '@/components/avanti_bottom_nav.vue'
import AvantiBalanceCard from '@/components/avanti_balance_card.vue'
import AvantiProcessCard from '@/components/avanti_process_card.vue'
import AvantiChecklistCard from '@/components/avanti_checklist_card.vue'
import { currentUser as user } from '@/config/user'
import type { ProcessStep } from '@/types/process'
import type { ChecklistItem } from '@/types/checklist'

// Page content will move to the Pinia store in Round 2; literals for now.
const breadcrumb = [
  { label: 'Piattaforma', to: '/' },
  { label: 'Home', current: true }
]
const balance = {
  label: 'Il tuo saldo',
  sublabel: 'Importo approvato dai nostri partner',
  status: 'Pronto al prelievo',
  amount: 12000,
  currency: '€',
  caption: 'Prestito personale • TAN 3,8%',
  footnote: "Fondi disponibili dopo l'approvazione dei documenti"
}
const processSteps: ProcessStep[] = [
  {
    icon: 'database',
    title: 'Verifica completata',
    description: 'I Suoi dati sono stati verificati con successo.'
  },
  {
    icon: 'lock-open',
    title: 'Account sbloccato',
    description: 'Il Suo account è stato sbloccato.'
  },
  {
    icon: 'wallet',
    title: 'Prelievo disponibile',
    description: 'Può effettuare il prelievo dei fondi quando desidera.',
    active: true
  }
]
const checklistItems: ChecklistItem[] = [
  { icon: 'chart', title: 'Simulazione completata', subtitle: 'Completato', state: 'done' },
  { icon: 'shield', title: 'Credito approvato', subtitle: 'Completato', state: 'done' },
  { icon: 'profile', title: 'Account creato', subtitle: 'Completato', state: 'done' },
  {
    icon: 'upload',
    title: 'Documenti caricati',
    subtitle: 'Step attuale • Azione richiesta',
    state: 'active'
  },
  { icon: 'edit', title: 'Contratto firmato', subtitle: 'In attesa', state: 'pending' }
]
</script>

<template>
  <div class="dashboard">
    <AvantiHeader :user="user" :notification-count="4" />
    <AvantiPageBar :user="user" :breadcrumb="breadcrumb" />

    <main class="dashboard__body">
      <div class="dashboard__content">
        <div class="dashboard__left">
          <AvantiBalanceCard
            :label="balance.label"
            :sublabel="balance.sublabel"
            :status="balance.status"
            :amount="balance.amount"
            :currency="balance.currency"
            :caption="balance.caption"
            :footnote="balance.footnote"
          />
          <AvantiProcessCard
            title="Sblocco dei&#10;fondi completato"
            :steps="processSteps"
          />
        </div>
        <div class="dashboard__right">
          <AvantiChecklistCard
            title="Fondi pronti per il&#10;prelievo - procedi ora!"
            :items="checklistItems"
          />
        </div>
      </div>
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
