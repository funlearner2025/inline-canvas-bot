// src/hooks/useTelegram.ts

import { useEffect, useMemo, useState } from 'react';
import { getWebApp, TelegramWebApp } from '@/lib/telegram';

/**
 * Hook to initialize and work with the Telegram WebApp SDK.
 * - Expands the viewport
 * - Calls WebApp.ready()
 * - Returns the Telegram SDK instance and a `ready` boolean
 */
export function useTelegram() {
  const tg = useMemo<TelegramWebApp | undefined>(() => getWebApp(), []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!tg) return;

    try {
      tg.ready?.();   // Notifies Telegram that Mini App is loaded
      tg.expand?.();  // Makes sure the viewport fills the screen
      setReady(true);
    } catch (err) {
      console.warn('Telegram WebApp SDK failed to init:', err);
    }
  }, [tg]);

  return { tg, ready };
}
