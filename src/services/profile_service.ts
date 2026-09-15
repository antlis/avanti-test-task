import { http } from '@/services/http'
import type { AccountData } from '@/types/profile'

/**
 * GET /api/me — the global account context (profile + notification counters).
 * Backed by a bundled mock JSON until VITE_API_BASE points at the Laravel API.
 */
export async function fetchAccount(): Promise<AccountData> {
  const { data } = await http.get<AccountData>('/mock/me.json')
  return data
}
