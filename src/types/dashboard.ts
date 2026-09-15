import type { ProcessStep } from '@/types/process'
import type { ChecklistStep } from '@/types/checklist'

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

// Verification stepper: the ordered steps plus the currently active one.
export interface Checklist {
  activeStep: number
  steps: ChecklistStep[]
}

// Payload of GET /api/dashboard.
export interface DashboardData {
  balance: Balance
  process: ProcessStep[]
  checklist: Checklist
  assistant: AssistantContact
}
