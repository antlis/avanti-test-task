import { computed } from 'vue'
import { defineStore } from 'pinia'

import { useAsyncState } from '@/composables/use_async_state'
import { fetchDashboard } from '@/services/dashboard_service'
import { formatPercent } from '@/utils/format'

/**
 * "Dom готовые этапы" dashboard data (balance, process, checklist, assistant).
 */
export const useDashboardStore = defineStore('dashboard', () => {
  const { data, isLoading, isError, execute } = useAsyncState(fetchDashboard)

  const balance = computed(() => data.value?.balance ?? null)
  const process = computed(() => data.value?.process ?? [])
  const checklist = computed(() => data.value?.checklist ?? [])
  const assistant = computed(() => data.value?.assistant ?? null)

  // "Prestito personale • TAN 3,8%" — composed from the raw balance fields.
  const balanceCaption = computed(() =>
    balance.value
      ? `${balance.value.product} • TAN ${formatPercent(balance.value.tan)}`
      : ''
  )

  async function load(): Promise<void> {
    if (data.value || isLoading.value) return
    await execute()
  }

  return {
    balance,
    process,
    checklist,
    assistant,
    balanceCaption,
    isLoading,
    isError,
    load,
    reload: execute
  }
})
