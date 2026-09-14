import { computed, ref, shallowRef } from 'vue'

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error'

/**
 * Wraps an async fetcher with the loading / error / retry states the UI needs.
 * Keeps view components free of try/catch boilerplate.
 */
export function useAsyncState<T>(fetcher: () => Promise<T>) {
  const data = shallowRef<T | null>(null)
  const error = shallowRef<unknown>(null)
  const status = ref<AsyncStatus>('idle')

  const isLoading = computed(() => status.value === 'pending')
  const isError = computed(() => status.value === 'error')
  const isSuccess = computed(() => status.value === 'success')

  async function execute(): Promise<void> {
    status.value = 'pending'
    error.value = null
    try {
      data.value = await fetcher()
      status.value = 'success'
    } catch (err) {
      error.value = err
      status.value = 'error'
    }
  }

  return { data, error, status, isLoading, isError, isSuccess, execute }
}
