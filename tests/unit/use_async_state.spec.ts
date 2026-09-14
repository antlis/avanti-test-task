import { describe, it, expect } from 'vitest'

import { useAsyncState } from '@/composables/use_async_state'

describe('useAsyncState', () => {
  it('starts idle', () => {
    const { status, isLoading } = useAsyncState(async () => 1)
    expect(status.value).toBe('idle')
    expect(isLoading.value).toBe(false)
  })

  it('resolves to success with data', async () => {
    const { data, status, isSuccess, execute } = useAsyncState(async () => 42)
    await execute()
    expect(status.value).toBe('success')
    expect(isSuccess.value).toBe(true)
    expect(data.value).toBe(42)
  })

  it('captures errors and exposes them', async () => {
    const boom = new Error('boom')
    const { error, status, isError, execute } = useAsyncState(async () => {
      throw boom
    })
    await execute()
    expect(status.value).toBe('error')
    expect(isError.value).toBe(true)
    expect(error.value).toBe(boom)
  })
})
