<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import AvantiHeader from '@/components/avanti_header.vue'
import AvantiBottomNav from '@/components/avanti_bottom_nav.vue'
import { useProfileStore } from '@/stores/profile'

// Stub screen for in-scope-but-unbuilt routes (Documenti / Profilo), so the
// primary navigation resolves to real destinations.
defineProps<{ title: string }>()

const profileStore = useProfileStore()
const { profile, notifications } = storeToRefs(profileStore)

onMounted(() => profileStore.load())
</script>

<template>
  <div class="placeholder">
    <AvantiHeader
      v-if="profile"
      :user="profile"
      :assistenza-count="notifications.assistenza"
      :bell-count="notifications.bell"
    />

    <main class="placeholder__body">
      <h1 class="placeholder__title">{{ title }}</h1>
      <p class="placeholder__text">Questa sezione sarà presto disponibile.</p>
    </main>

    <AvantiBottomNav />
  </div>
</template>

<style lang="scss" scoped>
.placeholder {
  min-height: 100dvh;
  background: $color-bg;

  &__body {
    @include container;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-2;
    padding-top: $space-10;
    text-align: center;
  }

  &__title {
    font-size: rem(24);
    font-weight: $fw-bold;
    color: $color-text-strong;
  }

  &__text {
    color: $color-text-muted;
  }
}
</style>
