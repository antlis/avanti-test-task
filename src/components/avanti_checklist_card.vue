<script setup lang="ts">
import { computed, ref } from 'vue'

import AvantiIcon from '@/components/avanti_icon.vue'
import AvantiChecklistItem from '@/components/avanti_checklist_item.vue'
import AvantiProgressSegments from '@/components/avanti_progress_segments.vue'
import type { ChecklistItem } from '@/types/checklist'

const props = defineProps<{ title: string; items: ChecklistItem[] }>()
const emit = defineEmits<{ select: [index: number] }>()

const open = ref(true)
const completed = computed(
  () => props.items.filter((item) => item.state === 'done').length
)
</script>

<template>
  <section class="checklist">
    <header class="checklist__head">
      <h2 class="checklist__title">{{ title }}</h2>
      <button
        type="button"
        class="checklist__toggle"
        :aria-expanded="open"
        aria-label="Mostra o nascondi i dettagli"
        @click="open = !open"
      >
        <AvantiIcon
          name="chevron-down"
          :size="14"
          class="checklist__chevron"
          :class="{ 'checklist__chevron--flip': !open }"
        />
      </button>
    </header>

    <div v-show="open" class="checklist__body">
      <ul class="checklist__list">
        <li
          v-for="(item, index) in items"
          :key="item.title"
          class="checklist__row"
        >
          <AvantiChecklistItem v-bind="item" @select="emit('select', index)" />
        </li>
      </ul>

      <AvantiProgressSegments
        class="checklist__progress"
        :total="items.length"
        :completed="completed"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.checklist {
  background: $color-surface;
  border: 1px solid $color-border-soft;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;

  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-3;
    padding: $space-4;
    border-bottom: 1px solid $color-border-soft;
  }

  &__title {
    font-size: rem(15);
    font-weight: $fw-bold;
    line-height: 1.3;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: pre-line;
    color: $color-primary;
  }

  &__toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    color: $color-text;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    background: $color-surface;

    &:hover {
      background: $color-bg;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  &__chevron {
    transition: transform 0.15s ease;

    &--flip {
      transform: rotate(180deg);
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__row {
    padding-inline: $space-4;
  }

  &__row + &__row {
    border-top: 1px solid $color-border-soft;
  }

  &__progress {
    padding: $space-4;
    border-top: 1px solid $color-border-soft;
  }
}
</style>
