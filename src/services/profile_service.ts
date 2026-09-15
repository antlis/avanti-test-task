import { fetchAccount } from '@/repositories/profile_repository'
import type { AccountData } from '@/types/profile'

/**
 * Business logic for profile.
 * Thin wrapper — mostly pass-through for now, but keeps the
 * repository ↔ store boundary clean for when Laravel lands.
 */
export async function loadProfile(): Promise<AccountData> {
  return fetchAccount()
}
