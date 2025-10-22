// src/components/TelegramSelect.tsx
import { SelectHTMLAttributes, forwardRef, memo } from 'react';
import { cn } from '@/lib/utils';

interface TelegramSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
}

/**
 * Telegram-style select dropdown optimized for Telegram Mini App
 * Prevents dropdown closing issues in iOS/Android WebView
 */
export const TelegramSelect = memo(forwardRef<HTMLSelectElement, TelegramSelectProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <div 
        className="relative w-full"
        style={{
          // Prevent layout shifts
          overflow: 'visible',
          zIndex: 'auto',
          // Prevent unwanted transforms
          transform: 'none',
          willChange: 'auto',
        }}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tg-hint-color,#999)] pointer-events-none z-10">
            {icon}
          </div>
        )}
        <select
          ref={ref}
          className={cn(
            // Base select styling
            "w-full px-4 py-3 rounded-xl font-sans text-base cursor-pointer",
            // Telegram theme colors
            "bg-[var(--tg-secondary-bg-color,rgba(255,255,255,0.08))]",
            "text-[var(--tg-text-color,#fff)]",
            "border border-[var(--tg-hint-color,rgba(255,255,255,0.1))]",
            // Focus states - NO ring to prevent reflow
            "focus:outline-none focus:border-[var(--tg-link-color,#8774e1)]",
            // Icon spacing
            icon && "pl-11",
            // Dropdown arrow spacing  
            "pr-10",
            className
          )}
          style={{
            // Critical: Prevent appearance override issues
            WebkitAppearance: 'menulist',
            MozAppearance: 'menulist',
            appearance: 'menulist',
            // Ensure proper layering
            position: 'relative',
            zIndex: 100,
          }}
          // Prevent event bubbling that might trigger parent updates
          onFocus={(e) => {
            e.stopPropagation();
            props.onFocus?.(e);
          }}
          onClick={(e) => {
            e.stopPropagation();
            props.onClick?.(e);
          }}
          {...props}
        >
          {children}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--tg-hint-color,#999)] z-10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
));

TelegramSelect.displayName = 'TelegramSelect';
