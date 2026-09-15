import { http } from '@/lib/http'
import type { AccountData } from '@/types/profile'

/**
 * Data access layer for profile.
 * In production this hits GET /api/me; mock fallback for local dev.
 */
export async function fetchAccount(): Promise<AccountData> {
  const { data } = await http.get<AccountData>('/mock/me.json')
  return data
}
