// src/lib/telegram.ts

export type TelegramWebApp = {
  initData?: string;
  initDataUnsafe?: any;
  themeParams?: any;
  colorScheme?: 'light' | 'dark' | 'unknown';
  viewportHeight?: number;
  viewportStableHeight?: number;
  expand: () => void;
  ready: () => void;
  close: () => void;
  MainButton?: {
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  BackButton?: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  onEvent?: (eventType: string, callback: (...args: any[]) => void) => void;
  offEvent?: (eventType: string, callback: (...args: any[]) => void) => void;

  // Mini Apps 2.0 – Location Manager
  locationManager?: {
    requestLocation: () => Promise<{
      latitude: number;
      longitude: number;
      accuracy?: number;
    }>;
  };
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

/**
 * Safely get the Telegram WebApp object (undefined-safe)
 */
export function getWebApp(): TelegramWebApp | undefined {
  return window?.Telegram?.WebApp;
}

/**
 * Use this in `style={{ ... }}` to apply safe padding on iOS/Android
 */
export function getSafeAreaVars() {
  return {
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  };
}
