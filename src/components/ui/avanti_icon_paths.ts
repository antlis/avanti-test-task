// Stroke-based icon registry (24x24 viewBox, currentColor). One `d` per <path>.
export type IconName =
  | 'home'
  | 'document'
  | 'profile'
  | 'chat'
  | 'headset'
  | 'check'
  | 'chevron-down'
  | 'bank'
  | 'arrow-right'

export const iconPaths: Record<IconName, string[]> = {
  home: ['M3 9.5 12 3l9 6.5', 'M5 10.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9.5'],
  document: [
    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
    'M14 2v6h6',
    'M9 13h6',
    'M9 17h6'
  ],
  profile: ['M4 21v-1a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v1', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  chat: ['M7.5 20.5 3 22l1.5-4.5A9 9 0 1 1 7.5 20.5z'],
  headset: [
    'M3 14v-2a9 9 0 0 1 18 0v2',
    'M18 14h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-2',
    'M6 14H5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z'
  ],
  check: ['M20 6 9 17l-5-5'],
  'chevron-down': ['M6 9l6 6 6-6'],
  bank: ['M3 21h18', 'M5 21V10', 'M19 21V10', 'M4 10 12 4l8 6', 'M9 21v-5h6v5'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6']
}
