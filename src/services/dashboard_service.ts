import { fetchDashboard } from '@/repositories/dashboard_repository'
import type { DashboardData } from '@/types/dashboard'

/**
 * Business logic for dashboard.
 * Thin wrapper — keeps the repository ↔ store boundary clean.
 */
export async function loadDashboard(): Promise<DashboardData> {
  return fetchDashboard()
}
