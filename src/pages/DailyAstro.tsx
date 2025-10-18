// src/pages/DailyAstro.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { locationManager } from "@telegram-apps/sdk";
import { postDailyAstro } from "../lib/api";
import { Loader2, Undo2, AlertCircle } from "lucide-react";

export default function DailyAstro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [astroData, setAstroData] = useState<any | null>(null);

  // Get user location (Telegram first, browser fallback)
  async function getLocation() {
    setError(null);
    setLoading(true);

    try {
      // Try Telegram Mini App location first
      const loc = await locationManager.requestLocation();
      return { lat: loc.latitude, lon: loc.longitude };
    } catch (e) {
      console.warn("Telegram location failed:", e);

      // Fallback to browser geolocation
      try {
        const coords = await new Promise<GeolocationCoordinates>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 8000 }
          );
        });
        return { lat: coords.latitude, lon: coords.longitude };
      } catch (geoErr) {
        console.error("Browser geolocation failed:", geoErr);
        setError("Unable to get location. Please enable location in Telegram or browser.");
        return null;
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle click — get location and call backend
  async function handleDailyAstro() {
    const coords = await getLocation();
    if (!coords) return;

    try {
      setLoading(true);
      const data = await postDailyAstro(coords.lat, coords.lon);
      setAstroData(data);
    } catch (e) {
      console.error("Daily Astro fetch failed:", e);
      setError("Failed to fetch daily astro data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/daily-astro-bg.png)',
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Safe area padding for mobile */}
      <div
        className="relative z-10 min-h-screen flex items-center justify-center p-4"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
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

        <div className="w-full max-w-md flex flex-col items-center">
          {/* Content without card container */}
          {!astroData && (
            <>
              {/* Zodiac Wheel */}
              <div className="relative w-64 h-64 mb-12">
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Zodiac wheel SVG */}
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                    style={{
                      filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.6))'
                    }}
                  >
                    {/* Outer circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="95"
                      fill="none"
                      stroke="rgba(167, 139, 250, 0.3)"
                      strokeWidth="0.5"
                    />
                    
                    {/* Inner circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke="rgba(167, 139, 250, 0.4)"
                      strokeWidth="0.5"
                    />
                    
                    {/* Center circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="25"
                      fill="rgba(79, 70, 229, 0.2)"
                      stroke="rgba(167, 139, 250, 0.5)"
                      strokeWidth="0.5"
                    />
                    
                    {/* 12 zodiac divisions */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30 - 90) * (Math.PI / 180);
                      const x1 = 100 + 25 * Math.cos(angle);
                      const y1 = 100 + 25 * Math.sin(angle);
                      const x2 = 100 + 95 * Math.cos(angle);
                      const y2 = 100 + 95 * Math.sin(angle);
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="rgba(167, 139, 250, 0.3)"
                          strokeWidth="0.5"
                        />
                      );
                    })}
                    
                    {/* Zodiac symbols (simplified) */}
                    {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, i) => {
                      const angle = (i * 30 - 90 + 15) * (Math.PI / 180);
                      const x = 100 + 82 * Math.cos(angle);
                      const y = 100 + 82 * Math.sin(angle);
                      return (
                        <text
                          key={i}
                          x={x}
                          y={y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="rgba(199, 210, 254, 0.9)"
                          fontSize="14"
                          fontFamily="Arial"
                        >
                          {symbol}
                        </text>
                      );
                    })}
                    
                    {/* Decorative inner lines */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle1 = (i * 30 - 90) * (Math.PI / 180);
                      const angle2 = ((i + 6) * 30 - 90) * (Math.PI / 180);
                      const x1 = 100 + 25 * Math.cos(angle1);
                      const y1 = 100 + 25 * Math.sin(angle1);
                      const x2 = 100 + 25 * Math.cos(angle2);
                      const y2 = 100 + 25 * Math.sin(angle2);
                      return (
                        <line
                          key={`inner-${i}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="rgba(167, 139, 250, 0.2)"
                          strokeWidth="0.3"
                        />
                      );
                    })}
                  </svg>
                </motion.div>
              </div>

              {/* Text Content */}
              <div className="text-center px-4">
                <h1 className="text-4xl font-bold mb-6 text-white">
                  Daily Astro
                </h1>
                
                <p className="text-gray-200 text-lg mb-10 leading-relaxed max-w-md">
                  Trace your daily path through the movements of the stars.
                </p>

                {/* Action Button */}
                <button
                  onClick={handleDailyAstro}
                  disabled={loading}
                  className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Celestial Vibe Today</span>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Location Error</p>
                  <p className="text-red-200/80">{error}</p>
                  <button
                    onClick={() => window.Telegram?.WebApp?.openSettings()}
                    className="mt-2 text-red-200 underline text-xs hover:text-white transition-colors"
                  >
                    Fix Location Permissions
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Card */}
          <AnimatePresence>
            {astroData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Your Cosmic Insights</h3>
                  <motion.button
                    onClick={() => {
                      setAstroData(null);
                      setError(null);
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    Refresh
                  </motion.button>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-200 leading-relaxed bg-black/20 p-4 rounded-lg">
                    {typeof astroData === 'string' ? astroData : JSON.stringify(astroData, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
