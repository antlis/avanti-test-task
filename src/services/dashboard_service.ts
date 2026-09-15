import { http } from '@/services/http'
import type { DashboardData } from '@/types/dashboard'

/**
 * GET /api/dashboard — the "Dom готовые этапы" screen payload.
 * Backed by a bundled mock JSON until VITE_API_BASE points at the Laravel API.
 */
export async function fetchDashboard(): Promise<DashboardData> {
  const { data } = await http.get<DashboardData>('/mock/dashboard.json')
  return data
}
