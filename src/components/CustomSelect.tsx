// src/components/CustomSelect.tsx
// BACKUP SOLUTION - Only use if native select fails
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  icon?: React.ReactNode;
  className?: string;
  placeholder?: string;
}

export function CustomSelect({ 
  value, 
  onChange, 
  options, 
  icon,
  className,
  placeholder = 'Select...'
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Selected Value Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 rounded-xl font-sans text-base cursor-pointer flex items-center justify-between",
          "bg-[var(--tg-secondary-bg-color,rgba(255,255,255,0.08))]",
          "text-[var(--tg-text-color,#fff)]",
          "border border-[var(--tg-hint-color,rgba(255,255,255,0.1))]",
          "focus:outline-none focus:border-[var(--tg-link-color,#8774e1)]",
          icon && "pl-11",
          className
        )}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tg-hint-color,#999)]">
            {icon}
          </div>
        )}
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-[var(--tg-hint-color,#999)] transition-transform flex-shrink-0",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl border border-[var(--tg-hint-color,rgba(255,255,255,0.1))] bg-[var(--tg-secondary-bg-color,rgba(255,255,255,0.08))] backdrop-blur-xl shadow-2xl z-50"
          style={{
            // Ensure dropdown is above everything
            position: 'absolute',
            zIndex: 9999,
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                "w-full px-4 py-3 text-left text-base transition-colors",
                "hover:bg-[var(--tg-link-color,#8774e1)]/20",
                "active:bg-[var(--tg-link-color,#8774e1)]/30",
                value === option.value && "bg-[var(--tg-link-color,#8774e1)]/20 font-semibold",
                "text-[var(--tg-text-color,#fff)]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
