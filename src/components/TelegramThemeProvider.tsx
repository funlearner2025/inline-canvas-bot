// src/components/TelegramThemeProvider.tsx
import { useEffect, ReactNode } from 'react';
import { getTelegramTheme, isDarkMode } from '@/lib/telegram';

interface TelegramThemeProviderProps {
  children: ReactNode;
}

/**
 * Syncs Telegram theme with app theme
 * Applies CSS variables from Telegram theme params
 */
export function TelegramThemeProvider({ children }: TelegramThemeProviderProps) {
  useEffect(() => {
    const applyTelegramTheme = () => {
      const theme = getTelegramTheme();
      const darkMode = isDarkMode();

      // Apply dark/light mode class
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Apply Telegram theme colors as CSS variables if available
      if (theme) {
        const root = document.documentElement;
        
        if (theme.backgroundColor) {
          root.style.setProperty('--tg-bg-color', theme.backgroundColor);
        }
        if (theme.textColor) {
          root.style.setProperty('--tg-text-color', theme.textColor);
        }
        if (theme.hintColor) {
          root.style.setProperty('--tg-hint-color', theme.hintColor);
        }
        if (theme.linkColor) {
          root.style.setProperty('--tg-link-color', theme.linkColor);
        }
        if (theme.buttonColor) {
          root.style.setProperty('--tg-button-color', theme.buttonColor);
        }
        if (theme.buttonTextColor) {
          root.style.setProperty('--tg-button-text-color', theme.buttonTextColor);
        }
      }
    };

    applyTelegramTheme();

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTelegramTheme();
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return <>{children}</>;
}
