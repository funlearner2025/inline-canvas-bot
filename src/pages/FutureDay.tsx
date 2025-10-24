// src/pages/FutureDay.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Undo2, CalendarDays, Sparkles, Loader2, Calendar, CalendarRange } from 'lucide-react';
import { LocationAutocomplete } from '@/components/LocationAutocomplete';
import { CustomSelect } from '@/components/CustomSelect';
import { postFutureDay } from '@/lib/api';

type ViewMode = 'menu' | 'single-day' | 'date-range';

export default function FutureDay() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [location, setLocation] = useState('');
  const today = new Date();
  
  // Single day states
  const [day, setDay] = useState<number | ''>('');
  const [month, setMonth] = useState<number | ''>('');
  const [year, setYear] = useState(today.getFullYear());
  
  // Date range states
  const [fromDay, setFromDay] = useState<number | ''>('');
  const [fromMonth, setFromMonth] = useState<number | ''>('');
  const [fromYear, setFromYear] = useState(today.getFullYear());
  const [toDay, setToDay] = useState<number | ''>('');
  const [toMonth, setToMonth] = useState<number | ''>('');
  const [toYear, setToYear] = useState(today.getFullYear());
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Check if debug mode is enabled via environment variable
  const isDebugMode = import.meta.env.VITE_FUTURE_DAY_DEBUG_MODE === 'true';

  // Add initial debug log when debug mode is enabled
  useEffect(() => {
    if (isDebugMode) {
      addLog('🐛 Debug mode enabled for Future Day');
      addLog(`📡 Backend URL: ${import.meta.env.VITE_FLASK_API_URL}`);
      addLog(`📍 Location autocomplete endpoint: /location_auto_complete`);
    }
  }, []);

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

  // Calculate days in selected month for single day
  const daysInMonth = month !== '' ? new Date(year, month, 0).getDate() : 31;
  
  // Calculate days in selected month for date range
  const fromDaysInMonth = fromMonth !== '' ? new Date(fromYear, fromMonth, 0).getDate() : 31;
  const toDaysInMonth = toMonth !== '' ? new Date(toYear, toMonth, 0).getDate() : 31;

  const handleSingleDaySubmit = async () => {
    if (!location) {
      setError('Please select a location');
      addLog('❌ No location selected');
      return;
    }

    if (month === '' || day === '') {
      setError('Please select a complete date');
      addLog('❌ Incomplete date selection');
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

  const handleDateRangeSubmit = async () => {
    if (!location) {
      setError('Please select a location');
      addLog('❌ No location selected');
      return;
    }

    if (fromMonth === '' || fromDay === '' || toMonth === '' || toDay === '') {
      setError('Please select complete date range');
      addLog('❌ Incomplete date range selection');
      return;
    }

    setError(null);
    setLoading(true);
    addLog('🚀 Starting Celestial Interval request...');
    addLog(`📍 Location: ${location}`);
    addLog(`📅 From: ${months[fromMonth - 1]} ${fromDay}, ${fromYear}`);
    addLog(`📅 To: ${months[toMonth - 1]} ${toDay}, ${toYear}`);

    try {
      addLog(`🌐 Calling API: ${import.meta.env.VITE_FLASK_API_URL}/future-day-range`);
      // TODO: Create API endpoint for date range
      // For now, showing placeholder
      addLog('⚠️ Date range API endpoint not yet implemented');
      setPrediction(`Date Range Request:
From: ${months[fromMonth - 1]} ${fromDay}, ${fromYear}
To: ${months[toMonth - 1]} ${toDay}, ${toYear}
Location: ${location}

API endpoint /future-day-range needs to be implemented.`);
    } catch (err) {
      console.error('Date range fetch failed:', err);
      addLog(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
      setError('Failed to fetch date range data. Please try again.');
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
          onClick={() => {
            if (viewMode !== 'menu') {
              setViewMode('menu');
              setError(null);
              setPrediction(null);
            } else {
              navigate('/');
            }
          }}
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
            {viewMode === 'menu' && 'Choose your cosmic journey'}
            {viewMode === 'single-day' && 'Plan your perfect day with cosmic guidance'}
            {viewMode === 'date-range' && 'Explore cosmic patterns across time'}
          </p>
        </header>

        {/* Main Content */}
        <div className="px-4 sm:px-6 pb-8">
          <div className="max-w-2xl mx-auto">
            
            {/* Menu View */}
            {viewMode === 'menu' && (
              <div className="space-y-4">
                {/* Pick Your Star Day Option */}
                <motion.button
                  onClick={() => setViewMode('single-day')}
                  className="w-full bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-xl border border-teal-500/30 rounded-2xl p-6 shadow-2xl hover:shadow-teal-500/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-white mb-1">Pick Your Star Day</h3>
                      <p className="text-teal-100 text-sm">Discover cosmic insights for a specific date</p>
                    </div>
                    <Sparkles className="w-6 h-6 text-teal-200" />
                  </div>
                </motion.button>

                {/* Set Your Celestial Interval Option */}
                <motion.button
                  onClick={() => setViewMode('date-range')}
                  className="w-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                      <CalendarRange className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-white mb-1">Set Your Celestial Interval</h3>
                      <p className="text-purple-100 text-sm">Explore cosmic patterns across a date range</p>
                    </div>
                    <Sparkles className="w-6 h-6 text-purple-200" />
                  </div>
                </motion.button>
              </div>
            )}

            {/* Single Day View */}
            {viewMode === 'single-day' && (
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="space-y-6">
                  {/* Location Input */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--tg-hint-color,#999)] mb-2">
                      Location
                    </label>
                    <LocationAutocomplete
                      value={location}
                      onChange={setLocation}
                      placeholder="Enter city or place..."
                      onDebugLog={addLog}
                    />
                  </div>

                  {/* Date Selectors: Month, Day, Year */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Month Selector */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--tg-hint-color,#999)] mb-2">
                        Month
                      </label>
                      <CustomSelect
                        value={month}
                        onChange={(value) => setMonth(Number(value))}
                        options={months.map((m, idx) => ({ value: idx + 1, label: m.slice(0, 3) }))}
                        placeholder="Month"
                      />
                    </div>

                    {/* Day Selector */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--tg-hint-color,#999)] mb-2">
                        Day
                      </label>
                      <CustomSelect
                        value={day}
                        onChange={(value) => setDay(Number(value))}
                        options={[...Array(daysInMonth)].map((_, idx) => ({ value: idx + 1, label: String(idx + 1) }))}
                        placeholder="Day"
                      />
                    </div>

                    {/* Year Selector */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--tg-hint-color,#999)] mb-2">
                        Year
                      </label>
                      <CustomSelect
                        value={year}
                        onChange={(value) => setYear(Number(value))}
                        options={[...Array(151)].map((_, idx) => {
                          const y = 1950 + idx;
                          return { value: y, label: String(y) };
                        })}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSingleDaySubmit}
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
            )}

            {/* Date Range View */}
            {viewMode === 'date-range' && (
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="space-y-6">
                  {/* Location Input */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--tg-hint-color,#999)] mb-2">
                      Location
                    </label>
                    <LocationAutocomplete
                      value={location}
                      onChange={setLocation}
                      placeholder="Enter city or place..."
                      onDebugLog={addLog}
                    />
                  </div>

                  {/* From Date */}
                  <div>
                    <label className="block text-base font-semibold text-purple-300 mb-3">
                      From
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {/* From Month */}
                      <div>
                        <label className="block text-xs font-medium text-[var(--tg-hint-color,#999)] mb-2">
                          Month
                        </label>
                        <CustomSelect
                          value={fromMonth}
                          onChange={(value) => setFromMonth(Number(value))}
                          options={months.map((m, idx) => ({ value: idx + 1, label: m.slice(0, 3) }))}
                          placeholder="Month"
                        />
                      </div>

                      {/* From Day */}
                      <div>
                        <label className="block text-xs font-medium text-[var(--tg-hint-color,#999)] mb-2">
                          Day
                        </label>
                        <CustomSelect
                          value={fromDay}
                          onChange={(value) => setFromDay(Number(value))}
                          options={[...Array(fromDaysInMonth)].map((_, idx) => ({ value: idx + 1, label: String(idx + 1) }))}
                          placeholder="Day"
                        />
                      </div>

                      {/* From Year */}
                      <div>
                        <label className="block text-xs font-medium text-[var(--tg-hint-color,#999)] mb-2">
                          Year
                        </label>
                        <CustomSelect
                          value={fromYear}
                          onChange={(value) => setFromYear(Number(value))}
                          options={[...Array(151)].map((_, idx) => {
                            const y = 1950 + idx;
                            return { value: y, label: String(y) };
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* To Date */}
                  <div>
                    <label className="block text-base font-semibold text-pink-300 mb-3">
                      To
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {/* To Month */}
                      <div>
                        <label className="block text-xs font-medium text-[var(--tg-hint-color,#999)] mb-2">
                          Month
                        </label>
                        <CustomSelect
                          value={toMonth}
                          onChange={(value) => setToMonth(Number(value))}
                          options={months.map((m, idx) => ({ value: idx + 1, label: m.slice(0, 3) }))}
                          placeholder="Month"
                        />
                      </div>

                      {/* To Day */}
                      <div>
                        <label className="block text-xs font-medium text-[var(--tg-hint-color,#999)] mb-2">
                          Day
                        </label>
                        <CustomSelect
                          value={toDay}
                          onChange={(value) => setToDay(Number(value))}
                          options={[...Array(toDaysInMonth)].map((_, idx) => ({ value: idx + 1, label: String(idx + 1) }))}
                          placeholder="Day"
                        />
                      </div>

                      {/* To Year */}
                      <div>
                        <label className="block text-xs font-medium text-[var(--tg-hint-color,#999)] mb-2">
                          Year
                        </label>
                        <CustomSelect
                          value={toYear}
                          onChange={(value) => setToYear(Number(value))}
                          options={[...Array(151)].map((_, idx) => {
                            const y = 1950 + idx;
                            return { value: y, label: String(y) };
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleDateRangeSubmit}
                    disabled={loading || !location}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
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
                        <span>Reveal Celestial Interval</span>
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
            )}

            {/* Debug Panel */}
            {isDebugMode && (
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
                  {debugLogs.length === 0 ? (
                    <div className="text-xs font-mono text-yellow-100 bg-black/30 p-2 rounded break-words overflow-wrap-anywhere">
                      No logs yet. Enter a location to see autocomplete logs.
                    </div>
                  ) : (
                    debugLogs.map((log, idx) => (
                      <div key={idx} className="text-xs font-mono text-yellow-100 bg-black/30 p-2 rounded break-words overflow-wrap-anywhere">
                        {log}
                      </div>
                    ))
                  )}
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
