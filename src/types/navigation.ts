import type { IconName } from '@/components/icon_names'

export interface NavItem {
  key: string
  label: string
  icon: IconName
  to: string
}
