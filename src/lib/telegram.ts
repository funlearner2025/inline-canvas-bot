// src/lib/telegram.ts
import { init, viewport, themeParams, miniApp } from "@telegram-apps/sdk";

/**
 * Initializes the Telegram Mini App SDK safely.
 * Call this once (e.g. from App.tsx)
 */
export function initTelegram() {
  try {
    // Initialize the SDK
    init();

    // Mount viewport if available (helps with safe-area insets)
    if (viewport.mount.isAvailable()) {
      viewport.mount();
      viewport.expand(); // Expand to full height
    }

    console.log("Telegram Mini App SDK initialized successfully.");
  } catch (error) {
    console.warn("Telegram SDK initialization failed:", error);
  }
}

/**
 * Get Telegram theme parameters
 */
export function getTelegramTheme() {
  try {
    if (themeParams.mount.isAvailable()) {
      themeParams.mount();
    }
    return themeParams.state();
  } catch (error) {
    console.warn("Theme params unavailable:", error);
    return null;
  }
}

/**
 * Check if app is running in dark mode
 */
export function isDarkMode(): boolean {
  try {
    const theme = getTelegramTheme();
    return theme?.colorScheme === 'dark';
  } catch {
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

/**
 * Show Telegram loading indicator
 */
export function showLoading() {
  try {
    if (miniApp.mount.isAvailable()) {
      miniApp.mount();
    }
    miniApp.setHeaderColor('#1a1a1a');
  } catch (error) {
    console.warn("Mini app methods unavailable:", error);
  }
}

/**
 * Hide Telegram loading indicator
 */
export function hideLoading() {
  try {
    // Placeholder for future implementation
  } catch (error) {
    console.warn("Mini app methods unavailable:", error);
  }
}
