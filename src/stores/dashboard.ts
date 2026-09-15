import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { useAsyncState } from '@/composables/use_async_state'
import { loadDashboard } from '@/services/dashboard_service'
import { deriveChecklist } from '@/utils/checklist'
import type { ChecklistItem } from '@/types/checklist'

/**
 * Thin Pinia store — delegates data access to the service layer.
 * When Laravel lands, only the repository changes; store stays untouched.
 */
export const useDashboardStore = defineStore('dashboard', () => {
  const { data, isLoading, isError, execute } = useAsyncState(loadDashboard)

  const balance = computed(() => data.value?.balance ?? null)
  const process = computed(() => data.value?.process ?? [])
  const assistant = computed(() => data.value?.assistant ?? null)

  // Verification stepper: the active step drives every row's state.
  const steps = computed(() => data.value?.checklist.steps ?? [])
  const activeStep = ref(0)

  // Seed the active step from the payload whenever fresh data arrives.
  watch(data, (loaded) => {
    if (loaded) activeStep.value = loaded.checklist.activeStep
  })

  const checklist = computed<ChecklistItem[]>(() =>
    deriveChecklist(steps.value, activeStep.value)
  )

  function setActiveStep(index: number): void {
    activeStep.value = Math.max(0, Math.min(index, steps.value.length - 1))
  }

  async function load(): Promise<void> {
    if (data.value || isLoading.value) return
    await execute()
  }

  return {
    balance,
    process,
    checklist,
    activeStep,
    assistant,
    isLoading,
    isError,
    load,
    reload: execute,
    setActiveStep
  }
})
