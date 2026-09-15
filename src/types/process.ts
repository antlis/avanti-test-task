import type { IconName } from '@/components/icon_names'

export interface ProcessStep {
  icon: IconName
  title: string
  description: string
  // Highlights the current step with a teal glow.
  active?: boolean
}
