import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { useAsyncState } from '@/composables/use_async_state'
import { loadDashboard } from '@/services/dashboard_service'
import { CHECKLIST_SUBTITLE } from '@/types/checklist'
import type { ChecklistItem, ChecklistState } from '@/types/checklist'

function stateFor(index: number, active: number): ChecklistState {
  if (index < active) return 'done'
  if (index === active) return 'active'
  return 'pending'
}

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
    steps.value.map((step, index) => {
      const state = stateFor(index, activeStep.value)
      return { ...step, state, subtitle: CHECKLIST_SUBTITLE[state] }
    })
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
