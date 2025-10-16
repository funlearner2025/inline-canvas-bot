// src/lib/telegram.ts
import { init, viewport } from "@telegram-apps/sdk";

/**
 * Initializes the Telegram Mini App SDK safely.
 * Call this once (e.g. from a page like DailyPanchangam)
 */
export function initTelegram() {
  try {
    // Initialize the SDK
    init();

    // Mount viewport if available (helps with safe-area insets)
    if (viewport.mount.isAvailable()) {
      viewport.mount();
    }

    console.log("Telegram Mini App SDK initialized successfully.");
  } catch (error) {
    console.warn("Telegram SDK initialization failed:", error);
  }
}
