import type { IconName } from '@/components/icon_names'

export type ChecklistState = 'done' | 'active' | 'pending'

export interface ChecklistItem {
  icon: IconName
  title: string
  subtitle: string
  state: ChecklistState
}
