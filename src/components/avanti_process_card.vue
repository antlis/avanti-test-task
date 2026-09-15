<script setup lang="ts">
import AvantiButton from '@/components/avanti_button.vue'
import AvantiProcessStep from '@/components/avanti_process_step.vue'
import type { ProcessStep } from '@/types/process'

withDefaults(
  defineProps<{
    // Use \n to control line breaks (rendered via white-space: pre-line).
    title: string
    steps: ProcessStep[]
    helpLabel?: string
  }>(),
  { helpLabel: 'Hai bisogno di aiuto?' }
)

const emit = defineEmits<{ help: [] }>()
</script>

<template>
  <section class="process">
    <header class="process__head">
      <h2 class="process__title">{{ title }}</h2>
      <AvantiButton
        variant="soft"
        size="compact"
        class="process__help"
        @click="emit('help')"
      >
        {{ helpLabel }}
      </AvantiButton>
    </header>

    <div class="process__panel">
      <template v-for="(step, index) in steps" :key="step.title">
        <AvantiProcessStep class="process__step" v-bind="step" />
        <span
          v-if="index < steps.length - 1"
          class="process__sep"
          aria-hidden="true"
        />
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.process {
  padding: $space-4;
  background: $color-surface;
  border: 1px solid $color-border-soft;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;

  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-3;
    margin-bottom: $space-5;
  }

  // `pre` breaks only at the \n in the title, never soft-wrapping a line;
  // flex-shrink: 0 keeps its intrinsic width so the pill can't squeeze it.
  &__title {
    flex-shrink: 0;
    font-size: rem(11);
    font-weight: $fw-extrabold;
    line-height: 1.25;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    white-space: pre;
    color: $color-primary;

    @include desktop {
      font-size: rem(20);
    }
  }

  &__panel {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: $space-2;
    padding: $space-4 $space-2;
    background: $color-bg;
    border: 1px solid $color-bg;
    border-radius: $radius-lg;

    // Very narrow phones: drop the connectors and tighten the columns.
    @media (max-width: 350px) {
      gap: 2px;
    }

    @include desktop {
      gap: $space-4;
    }
  }

  &__help {
    flex-shrink: 0;
    font-size: rem(11);
    font-weight: $fw-bold;

    @include desktop {
      font-size: rem(16);
    }
  }

  &__step {
    flex: 1 1 0;
  }

  // Short connector aligned to the icon row (badge is 56px tall).
  &__sep {
    flex-shrink: 0;
    width: 16px;
    height: 2px;
    margin-top: 27px;
    background: $color-primary;
    border-radius: $radius-pill;

    @media (max-width: 350px) {
      display: none;
    }
  }
}
</style>
