// src/components/TelegramInput.tsx
import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TelegramInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

/**
 * Telegram-style input that syncs with theme
 * Uses Telegram color variables with Tailwind styling
 */
export const TelegramInput = forwardRef<HTMLInputElement, TelegramInputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tg-hint-color,#999)]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            // Base Telegram-style input
            "w-full px-4 py-3 rounded-xl font-sans text-base",
            // Use Telegram theme colors
            "bg-[var(--tg-secondary-bg-color,rgba(255,255,255,0.08))]",
            "text-[var(--tg-text-color,#fff)]",
            "border border-[var(--tg-hint-color,rgba(255,255,255,0.1))]",
            "placeholder:text-[var(--tg-hint-color,#999)]",
            // Focus states with Telegram accent
            "focus:outline-none focus:ring-2 focus:ring-[var(--tg-link-color,#8774e1)] focus:border-transparent",
            // Smooth transitions
            "transition-all duration-200",
            // Icon spacing
            icon && "pl-11",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TelegramInput.displayName = 'TelegramInput';
