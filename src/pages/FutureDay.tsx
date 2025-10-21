// src/pages/FutureDay.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Undo2, CalendarDays, Sparkles, Loader2 } from 'lucide-react';
import { LocationAutocomplete } from '@/components/LocationAutocomplete';
import { TelegramSelect } from '@/components/TelegramSelect';
import { postFutureDay } from '@/lib/api';

export default function FutureDay() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const today = new Date();
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Check if debug mode is enabled via environment variable
  const isDebugMode = import.meta.env.VITE_FUTURE_DAY_DEBUG_MODE === 'true';

  // Add log to debug panel
  const addLog = (message: string) => {
    if (isDebugMode) {
      const timestamp = new Date().toLocaleTimeString();
      setDebugLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calculate days in selected month
  const daysInMonth = new Date(year, month, 0).getDate();

  const handleSubmit = async () => {
    if (!location) {
      setError('Please select a location');
      addLog('❌ No location selected');
      return;
    }

    setError(null);
    setLoading(true);
    addLog('🚀 Starting Future Day request...');
    addLog(`📍 Location: ${location}`);
    addLog(`📅 Date: ${months[month - 1]} ${day}, ${year}`);

    try {
      addLog(`🌐 Calling API: ${import.meta.env.VITE_FLASK_API_URL}/future-day`);
      const data = await postFutureDay({ location, day, month, year });
      addLog('✅ API Response received');
      addLog(`📦 Response data: ${JSON.stringify(data).substring(0, 100)}...`);
      setPrediction(data?.message || JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Future Day fetch failed:', err);
      addLog(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
      setError('Failed to fetch future day data. Please try again.');
    } finally {
      setLoading(false);
      addLog('🏁 Request completed');
    }
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/future-day-bg.png)',
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Safe area padding for mobile */}
      <div className="relative z-10 min-h-screen" style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}>
        {/* Floating Back Button - Bottom Right */}
        <button
          onClick={() => navigate('/')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl border border-white/20 transition-all hover:scale-110 active:scale-95 z-50"
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)',
            right: 'calc(env(safe-area-inset-right) + 1.5rem)',
          }}
        >
          <Undo2 className="w-6 h-6 text-white" />
        </button>

        {/* Header */}
        <header className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <CalendarDays className="w-8 h-8 text-teal-400" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Decode Celestial Day
            </h1>
          </div>
          <p className="text-gray-300 text-sm sm:text-base ml-11">
            Plan your perfect day with cosmic guidance
          </p>
        </header>

        {/* Main Content */}
        <div className="px-4 sm:px-6 pb-8">
          <div className="max-w-2xl mx-auto">
            {/* Input Card */}
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="space-y-6">
                {/* Location Input - Telegram UI style */}
                <div>
                  <label className="block text-sm font-medium text-[var(--tg-hint-color,#999)] mb-2">
                    Location
                  </label>
                  <LocationAutocomplete
                    value={location}
                    onChange={setLocation}
                    placeholder="Enter city or place..."
                  />
                </div>

                {/* Date Selectors Grid - Telegram UI style - Reordered: Month, Day, Year */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Month Selector */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--tg-hint-color,#999)] mb-2">
                      Month
                    </label>
                    <TelegramSelect
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                    >
                      {months.map((m, idx) => (
                        <option key={idx} value={idx + 1}>
                          {m.slice(0, 3)}
                        </option>
                      ))}
                    </TelegramSelect>
                  </div>

                  {/* Day Selector */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--tg-hint-color,#999)] mb-2">
                      Day
                    </label>
                    <TelegramSelect
                      value={day}
                      onChange={(e) => setDay(Number(e.target.value))}
                    >
                      {[...Array(daysInMonth)].map((_, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                    </TelegramSelect>
                  </div>

                  {/* Year Selector */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--tg-hint-color,#999)] mb-2">
                      Year
                    </label>
                    <TelegramSelect
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                    >
                      {[...Array(151)].map((_, idx) => {
                        const y = 1950 + idx;
                        return (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        );
                      })}
                    </TelegramSelect>
                  </div>
                </div>

                {/* Submit Button - Telegram UI style with Tailwind enhancements */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={loading || !location}
                  className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl font-semibold shadow-lg hover:shadow-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Consulting the cosmos...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Reveal Future Day</span>
                    </>
                  )}
                </motion.button>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Debug Panel */}
            {isDebugMode && debugLogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-yellow-900/40 backdrop-blur-xl border border-yellow-500/50 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-yellow-300">🐛 Debug Logs</h3>
                  <button
                    onClick={() => setDebugLogs([])}
                    className="text-xs bg-yellow-500/20 hover:bg-yellow-500/30 px-3 py-1 rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {debugLogs.map((log, idx) => (
                    <div key={idx} className="text-xs font-mono text-yellow-100 bg-black/30 p-2 rounded break-words overflow-wrap-anywhere">
                      {log}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results Card */}
            {prediction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gradient-to-br from-teal-900/40 to-cyan-900/40 backdrop-blur-xl border border-teal-500/30 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-teal-400" />
                  <h3 className="text-xl font-semibold">Cosmic Insights</h3>
                </div>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-200 leading-relaxed">
                    {prediction}
                  </pre>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
