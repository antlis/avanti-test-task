import type { IconName } from '@/components/icon_names'

export type ChecklistState = 'done' | 'active' | 'pending'

// Raw step from the API — its position relative to activeStep decides the state.
export interface ChecklistStep {
  icon: IconName
  title: string
}

// A step resolved for rendering (state + subtitle derived from activeStep).
export interface ChecklistItem extends ChecklistStep {
  state: ChecklistState
  subtitle: string
}

// Subtitle shown for each state.
export const CHECKLIST_SUBTITLE: Record<ChecklistState, string> = {
  done: 'Completato',
  active: 'Step attuale • Azione richiesta',
  pending: 'In attesa'
}
