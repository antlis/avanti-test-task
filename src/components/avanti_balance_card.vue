<script setup lang="ts">
import { computed } from 'vue'

import AvantiBadge from '@/components/avanti_badge.vue'
import AvantiButton from '@/components/avanti_button.vue'
import AvantiIcon from '@/components/avanti_icon.vue'
import { formatMoney } from '@/utils/format'

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

const formattedAmount = computed(() => formatMoney(props.amount, props.currency))
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
        <AvantiIcon name="bank" :size="20" />
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
  padding: $space-6;
  background: $gradient-primary;
  border-radius: $radius-xl;
  box-shadow: $shadow-teal;
  color: $color-surface;

  @media (max-width: 350px) {
    padding: $space-4;
  }

  @include desktop {
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
      gap: 22px;
    }
  }

  &__label {
    font-size: rem(13);
    font-weight: 300;
    letter-spacing: 0.01em;
    color: $color-primary-tint;

    @include desktop {
      font-weight: $fw-semibold;
      text-transform: uppercase;
    }
  }

  &__sublabel {
    font-size: rem(10);
    font-weight: $fw-semibold;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: $color-primary-tint;

    @include desktop {
      font-size: rem(16);
    }
  }

  &__amount-block {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    margin-top: 12px;
    margin-bottom: 16px;

    @include desktop {
      margin-top: 16px;
      margin-bottom: 16px;
    }
  }

  &__amount-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
  }

  &__amount {
    font-size: rem(36);
    font-weight: $fw-bold;
    letter-spacing: -0.015em;
    line-height: 1.1;

    @media (max-width: 350px) {
      font-size: rem(28);
    }

    @include desktop {
      font-size: rem(52);
    }
  }

  &__caption {
    font-size: rem(12);
    color: $color-primary-tint;
  }

  // Prestito quick action — mobile only.
  &__prestito {
    flex-shrink: 0;
    font-size: rem(12);

    @include desktop {
      display: none;
    }
  }

  &__cta {
    border: 1px solid $color-primary;
    box-shadow: 0 0 22px rgba(255, 255, 255, 0.9);
    font-size: rem(16);
  }

  &__arrow {
    font-size: rem(18);
  }

  // Footnote — desktop only.
  &__footer {
    display: none;
    align-items: center;
    gap: $space-4;
    padding-top: $space-4;

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
    font-size: rem(12);
    color: $color-primary-tint;
  }
}
</style>
