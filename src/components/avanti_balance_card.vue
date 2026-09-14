<script setup lang="ts">
import { computed } from 'vue'

import AvantiBadge from '@/components/avanti_badge.vue'
import AvantiButton from '@/components/avanti_button.vue'
import AvantiIcon from '@/components/avanti_icon.vue'

const props = withDefaults(
  defineProps<{
    label: string
    sublabel: string
    status: string
    amount: number
    currency?: string
    caption: string
    footnote?: string
    ctaLabel?: string
  }>(),
  { currency: '€', footnote: '', ctaLabel: 'Preleva i fondi' }
)

const emit = defineEmits<{ withdraw: []; openPdf: [] }>()

const formattedAmount = computed(
  () => `${props.currency} ${props.amount.toLocaleString('fr-FR')}`
)
</script>

<template>
  <section class="balance">
    <header class="balance__meta">
      <div class="balance__labels">
        <span class="balance__label">{{ label }}</span>
        <span class="balance__sublabel">{{ sublabel }}</span>
      </div>
      <AvantiBadge tone="on-primary">{{ status }}</AvantiBadge>
    </header>

    <div class="balance__amount-block">
      <div class="balance__amount-row">
        <p class="balance__amount">{{ formattedAmount }}</p>
        <!-- Mobile-only quick action -->
        <AvantiButton
          variant="inverse"
          size="compact"
          class="balance__prestito"
          @click="emit('openPdf')"
        >
          <template #leading>
            <AvantiIcon name="document" :size="16" />
          </template>
          Prestito
        </AvantiButton>
      </div>
      <p class="balance__caption">{{ caption }}</p>
    </div>

    <AvantiButton
      variant="inverse"
      size="lg"
      block
      class="balance__cta"
      @click="emit('withdraw')"
    >
      <template #leading>
        <AvantiIcon name="bank" :size="24" />
      </template>
      {{ ctaLabel }}
      <template #trailing>
        <span class="balance__arrow" aria-hidden="true">→</span>
      </template>
    </AvantiButton>

    <!-- Desktop-only footnote -->
    <div v-if="footnote" class="balance__footer">
      <span class="balance__footer-line" aria-hidden="true"></span>
      <span class="balance__footer-text">{{ footnote }}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.balance {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding: $space-6;
  background: $gradient-primary;
  border-radius: $radius-xl;
  box-shadow: $shadow-teal;
  color: $color-surface;

  @include desktop {
    gap: $space-5;
    padding: $space-8;
  }

  &__meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-3;
  }

  &__labels {
    display: flex;
    flex-direction: column;
    gap: $space-2;

    @include desktop {
      gap: $space-5;
    }
  }

  // Mobile: light, sentence case. Desktop: semibold uppercase.
  &__label {
    font-size: 13px;
    font-weight: $fw-regular;
    letter-spacing: 0.01em;
    color: $color-primary-tint;

    @include desktop {
      font-weight: $fw-semibold;
      text-transform: uppercase;
    }
  }

  &__sublabel {
    font-size: 10px;
    font-weight: $fw-semibold;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: $color-primary-tint;

    @include desktop {
      font-size: 16px;
    }
  }

  &__amount-block {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__amount-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
  }

  &__amount {
    font-size: 40px;
    font-weight: $fw-bold;
    letter-spacing: -0.015em;
    line-height: 1.1;

    @include desktop {
      font-size: 52px;
    }
  }

  &__caption {
    font-size: 14px;
    color: $color-primary-tint;
  }

  // Prestito quick action — mobile only.
  &__prestito {
    flex-shrink: 0;

    @include desktop {
      display: none;
    }
  }

  // The main CTA glows white to pop on the gradient.
  &__cta {
    box-shadow: 0 0 22px rgba(255, 255, 255, 0.9);
  }

  &__arrow {
    font-size: 18px;
  }

  // Footnote — desktop only.
  &__footer {
    display: none;
    align-items: center;
    gap: $space-4;
    padding-top: $space-2;

    @include desktop {
      display: flex;
    }
  }

  &__footer-line {
    width: 100px;
    height: 1px;
    background: rgba(255, 255, 255, 0.31);
  }

  &__footer-text {
    font-size: 12px;
    color: $color-primary-tint;
  }
}
</style>
