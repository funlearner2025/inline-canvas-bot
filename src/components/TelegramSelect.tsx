// src/components/TelegramSelect.tsx
import { SelectHTMLAttributes, forwardRef } from 'react';
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
    return (
      <div 
        className="relative w-full" 
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: 'transform', // Optimize for changes
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
            // Base Telegram-style select
            "w-full px-4 py-3 rounded-xl font-sans text-base appearance-none cursor-pointer",
            // Use Telegram theme colors
            "bg-[var(--tg-secondary-bg-color,rgba(255,255,255,0.08))]",
            "text-[var(--tg-text-color,#fff)]",
            "border border-[var(--tg-hint-color,rgba(255,255,255,0.1))]",
            // Focus states
            "focus:outline-none focus:ring-2 focus:ring-[var(--tg-link-color,#8774e1)] focus:border-transparent",
            // Smooth transitions
            "transition-all duration-200",
            // Icon spacing
            icon && "pl-11",
            // Dropdown arrow spacing
            "pr-10",
            // Ensure proper touch handling and z-index
            "touch-manipulation relative z-20",
            className
          )}
          style={{
            WebkitTapHighlightColor: 'transparent',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            touchAction: 'manipulation', // Prevent touch delays
          }}
          onTouchStart={(e) => {
            // Prevent any parent touch handlers from interfering
            e.stopPropagation();
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
