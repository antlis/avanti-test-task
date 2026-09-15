import { computed } from 'vue'
import { defineStore } from 'pinia'

import { useAsyncState } from '@/composables/use_async_state'
import { loadProfile } from '@/services/profile_service'

/**
 * Thin Pinia store — delegates data access to the service layer.
 * When Laravel lands, only the repository changes; store stays untouched.
 */
export const useProfileStore = defineStore('profile', () => {
  const { data, isLoading, isError, execute } = useAsyncState(loadProfile)

  const profile = computed(() => data.value?.profile ?? null)
  const notifications = computed(
    () => data.value?.notifications ?? { assistenza: 0, bell: 0 }
  )

  async function load(): Promise<void> {
    if (data.value || isLoading.value) return
    await execute()
  }

  return { profile, notifications, isLoading, isError, load, reload: execute }
})
