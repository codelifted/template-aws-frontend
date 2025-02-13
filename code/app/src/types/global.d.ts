export {}
declare global {
  interface Window {
    dataLayer: any
    birdeatsbug: any
    Frill: Frill
    Frill_Config: FrillConfig[]
  }

  class Frill {
    widget(config: FrillConfig): FrillWidget
  }

  class FrillWidget {
    open(): void
    close(): void
    destroy(): void
    markAsRead(): void
  }

  interface FrillConfig {
    key: string
    container?: HTMLElement
    settings?: any
    ssoToken?: string
    callbacks?: {
      onReady?(frillWidget: FrillWidget): void
      onBadgeCount?(event: {
        announcements: { idx: string; slug: string; published_at: string }[]
        count: number
      }): void
    }
  }
}
