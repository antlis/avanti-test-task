// Signed-in user, shared across the whole private cabinet (header, page bar, …).
export interface UserProfile {
  name: string
  email: string
  avatar?: string
}

// Unread counters surfaced in the header (Assistenza pill on desktop, bell on mobile).
export interface NotificationCounts {
  assistenza: number
  bell: number
}

// Payload of GET /api/me — the global account context.
export interface AccountData {
  profile: UserProfile
  notifications: NotificationCounts
}
