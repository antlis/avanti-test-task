import type { NavItem } from '@/types/navigation'

// Primary navigation, shared by the desktop header menu and the mobile bottom nav.
export const mainNavItems: NavItem[] = [
  { key: 'home', label: 'Home', icon: 'home', to: '/' },
  { key: 'documenti', label: 'Documenti', icon: 'document', to: '/documenti' },
  { key: 'profilo', label: 'Profilo', icon: 'profile', to: '/profilo' }
]
