<script setup lang="ts">
import AvantiUserSummary from '@/components/layout/avanti_user_summary.vue'
import AvantiBreadcrumb, { type Crumb } from '@/components/layout/avanti_breadcrumb.vue'

interface PageUser {
  name: string
  email: string
  avatar?: string
}

defineProps<{ user: PageUser; breadcrumb?: Crumb[] }>()
</script>

<template>
  <div class="page-bar">
    <AvantiUserSummary :name="user.name" :email="user.email" :avatar="user.avatar" />
    <AvantiBreadcrumb v-if="breadcrumb" :items="breadcrumb" />
  </div>
</template>

<style lang="scss" scoped>
.page-bar {
  @include container;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $space-4;
  padding-block: $space-3 - 2px;
}
</style>
