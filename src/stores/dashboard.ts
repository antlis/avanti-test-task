import { computed } from 'vue'
import { defineStore } from 'pinia'

import { useAsyncState } from '@/composables/use_async_state'
import { loadDashboard } from '@/services/dashboard_service'

/**
 * Thin Pinia store — delegates data access to the service layer.
 * When Laravel lands, only the repository changes; store stays untouched.
 */
export const useDashboardStore = defineStore('dashboard', () => {
  const { data, isLoading, isError, execute } = useAsyncState(loadDashboard)

  const balance = computed(() => data.value?.balance ?? null)
  const process = computed(() => data.value?.process ?? [])
  const checklist = computed(() => data.value?.checklist ?? [])
  const assistant = computed(() => data.value?.assistant ?? null)

  async function load(): Promise<void> {
    if (data.value || isLoading.value) return
    await execute()
  }

  return {
    balance,
    process,
    checklist,
    assistant,
    isLoading,
    isError,
    load,
    reload: execute
  }
})
