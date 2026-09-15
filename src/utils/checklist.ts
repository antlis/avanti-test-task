import type {
  ChecklistItem,
  ChecklistState,
  ChecklistStep
} from '@/types/checklist'

// Subtitle shown for each derived state.
export const CHECKLIST_SUBTITLE: Record<ChecklistState, string> = {
  done: 'Completato',
  active: 'Step attuale • Azione richiesta',
  pending: 'In attesa'
}

// A step's state is decided by its position relative to the active step.
export function stateFor(index: number, active: number): ChecklistState {
  if (index < active) return 'done'
  if (index === active) return 'active'
  return 'pending'
}

// Resolve raw API steps into render-ready items for a given active step.
export function deriveChecklist(
  steps: ChecklistStep[],
  activeStep: number
): ChecklistItem[] {
  return steps.map((step, index) => {
    const state = stateFor(index, activeStep)
    return { ...step, state, subtitle: CHECKLIST_SUBTITLE[state] }
  })
}
