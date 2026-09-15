import { computed } from 'vue'
import { defineStore } from 'pinia'

import { useAsyncState } from '@/composables/use_async_state'
import { fetchAccount } from '@/services/profile_service'

/**
 * Global account context (profile + notification counters), shared by every
 * screen in the private cabinet. Loaded once and reused across routes.
 */
export const useProfileStore = defineStore('profile', () => {
  const { data, isLoading, isError, execute } = useAsyncState(fetchAccount)

  const profile = computed(() => data.value?.profile ?? null)
  const notifications = computed(
    () => data.value?.notifications ?? { assistenza: 0, bell: 0 }
  )

  // Idempotent: fetch only once, then serve the cached account.
  async function load(): Promise<void> {
    if (data.value || isLoading.value) return
    await execute()
  }

  return { profile, notifications, isLoading, isError, load, reload: execute }
})
