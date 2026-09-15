import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { fetchAccount } from '@/services/profile_service'
import { useProfileStore } from '@/stores/profile'
import type { AccountData } from '@/types/profile'

vi.mock('@/services/profile_service', () => ({ fetchAccount: vi.fn() }))

const account: AccountData = {
  profile: { name: 'Marco Rossi', email: 'ikoei@09gmail.com', avatar: '/a.png' },
  notifications: { assistenza: 4, bell: 4 }
}

describe('useProfileStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(fetchAccount).mockReset()
  })

  it('exposes the profile and notification counters after load', async () => {
    vi.mocked(fetchAccount).mockResolvedValue(account)
    const store = useProfileStore()

    await store.load()

    expect(store.profile?.name).toBe('Marco Rossi')
    expect(store.notifications.assistenza).toBe(4)
    expect(store.notifications.bell).toBe(4)
  })

  it('defaults counters to zero before data arrives', () => {
    const store = useProfileStore()
    expect(store.profile).toBeNull()
    expect(store.notifications).toEqual({ assistenza: 0, bell: 0 })
  })
})
