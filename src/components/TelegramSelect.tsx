// src/components/TelegramSelect.tsx
import { SelectHTMLAttributes, forwardRef, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TelegramSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
}

/**
 * Telegram-style select dropdown that syncs with theme
 * Uses Telegram color variables with Tailwind styling
 */
export const TelegramSelect = forwardRef<HTMLSelectElement, TelegramSelectProps>(
  ({ className, icon, children, ...props }, ref) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    
    const handleClick = (e: React.MouseEvent<HTMLSelectElement>) => {
      e.stopPropagation();
      // Ensure the select gets focus and opens
      const target = e.currentTarget;
      setTimeout(() => {
        target.focus();
        // Trigger the select to open by simulating a mousedown
        const event = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        target.dispatchEvent(event);
      }, 0);
    };

    return (
      <div 
        className="relative w-full" 
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          isolation: 'isolate', // Create new stacking context
        }}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tg-hint-color,#999)] pointer-events-none z-10">
            {icon}
          </div>
        )}
        <select
          ref={ref || selectRef}
          className={cn(
            // Base Telegram-style select
            "w-full px-4 py-3 rounded-xl font-sans text-base cursor-pointer",
            // Use Telegram theme colors
            "bg-[var(--tg-secondary-bg-color,rgba(255,255,255,0.08))]",
            "text-[var(--tg-text-color,#fff)]",
            "border border-[var(--tg-hint-color,rgba(255,255,255,0.1))]",
            // Focus states
            "focus:outline-none focus:ring-2 focus:ring-[var(--tg-link-color,#8774e1)] focus:border-transparent",
            // Icon spacing
            icon && "pl-11",
            // Dropdown arrow spacing
            "pr-10",
            // Ensure proper layering
            "relative z-20",
            className
          )}
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
          }}
          onClick={handleClick}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleClick(e as any);
          }}
          {...props}
        >
          {children}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--tg-hint-color,#999)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);

TelegramSelect.displayName = 'TelegramSelect';
