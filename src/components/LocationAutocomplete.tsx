// src/components/LocationAutocomplete.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchLocation } from '@/lib/api';
import { MapPin, Loader2 } from 'lucide-react';
import { TelegramInput } from './TelegramInput';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Autocomplete input for location search
 * Uses Telegram-style input with Tailwind animations
 * Connects to Flask backend webhook with Google Maps API
 */
export function LocationAutocomplete({ value, onChange, placeholder }: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Debounced search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.length < 3) {
      setSuggestions([]);
      console.log('[LocationAutocomplete] Query too short, minimum 3 characters required');
      return;
    }

    console.log(`[LocationAutocomplete] Starting search for: "${value}"`);
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        console.log(`[LocationAutocomplete] Calling searchLocation API...`);
        const results = await searchLocation(value);
        console.log(`[LocationAutocomplete] Received ${results.length} suggestions:`, results);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('[LocationAutocomplete] Search failed:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value]);

  const handleSelect = (location: string) => {
    onChange(location);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      {/* Telegram-style Input with icon */}
      <div className="relative">
        <TelegramInput
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder || 'Search location...'}
          icon={<MapPin className="w-5 h-5" />}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-5 h-5 text-[var(--tg-link-color,#8774e1)] animate-spin" />
          </div>
        )}
      </div>

      {/* Suggestions dropdown with Tailwind animations */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-[var(--tg-secondary-bg-color,rgba(0,0,0,0.8))] border border-[var(--tg-hint-color,rgba(255,255,255,0.1))] rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto backdrop-blur-xl"
          >
            {suggestions.map((location, index) => (
              <motion.button
                key={index}
                onClick={() => handleSelect(location)}
                className="w-full px-4 py-3 text-left text-[var(--tg-text-color,#fff)] hover:bg-[var(--tg-hint-color,rgba(255,255,255,0.1))] transition-colors flex items-center gap-2 border-b border-[var(--tg-hint-color,rgba(255,255,255,0.05))] last:border-b-0"
                whileTap={{ scale: 0.98 }}
              >
                <MapPin className="w-4 h-4 text-[var(--tg-link-color,#8774e1)] flex-shrink-0" />
                <span className="text-sm">{location}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}
