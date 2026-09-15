import type { ProcessStep } from '@/types/process'
import type { ChecklistItem } from '@/types/checklist'

// Approved-loan balance shown in the teal card.
export interface Balance {
  label: string
  sublabel: string
  status: string
  amount: number
  currency: string
  product: string
  tan: number
  footnote?: string
}

// Assistant contact behind the floating chat popup.
export interface AssistantContact {
  name: string
  message: string
  avatar: string
  unread: number
}

// Payload of GET /api/dashboard.
export interface DashboardData {
  balance: Balance
  process: ProcessStep[]
  checklist: ChecklistItem[]
  assistant: AssistantContact
}
