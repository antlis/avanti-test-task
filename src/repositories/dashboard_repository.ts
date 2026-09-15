import { http } from '@/lib/http'
import type { DashboardData } from '@/types/dashboard'

/**
 * Data access layer for dashboard.
 * In production this hits GET /api/dashboard; mock fallback for local dev.
 */
export async function fetchDashboard(): Promise<DashboardData> {
  const { data } = await http.get<DashboardData>('/mock/dashboard.json')
  return data
}
