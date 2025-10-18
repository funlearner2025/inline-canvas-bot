// src/pages/DailyAstro.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { locationManager } from "@telegram-apps/sdk";
import { postDailyAstro } from "../lib/api";
import { CosmicBackground } from "@/components/CosmicBackground";
import { MapPin, Loader2, ArrowLeft, Sparkles, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen relative text-white">
      <CosmicBackground />

      {/* Safe area padding for mobile */}
      <div
        className="relative z-10 min-h-screen"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-6"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Home</span>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Celestial Vibe Today
            </h1>
          </div>
          <p className="text-gray-300 text-sm sm:text-base ml-11">
            Discover your cosmic insights for the day
          </p>
        </motion.header>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 sm:px-6 pb-8 flex flex-col items-center"
        >
          <div className="max-w-2xl w-full">
            {/* Main Action Card */}
            {!astroData && (
              <motion.div
                className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(99, 102, 241, 0.5)',
                      '0 0 40px rgba(139, 92, 246, 0.8)',
                      '0 0 20px rgba(99, 102, 241, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MapPin className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="text-2xl font-semibold mb-3">Ready to Explore?</h2>
                <p className="text-gray-400 mb-6">
                  We'll use your location to provide personalized cosmic insights
                </p>

                {/* Action Button */}
                <motion.button
                  onClick={handleDailyAstro}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mx-auto"
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Fetching your stars...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Get Today's Astro</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
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
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-indigo-400" />
                      <h3 className="text-xl font-semibold">Your Cosmic Insights</h3>
                    </div>
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
        </motion.div>
      </div>
    </div>
  );
}
