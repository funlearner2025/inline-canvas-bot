// src/pages/Index.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Sparkles } from "lucide-react";
import { locationManager } from "@telegram-apps/sdk";
import { postDailyAstro } from "@/lib/api";

export default function Index() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [astroData, setAstroData] = useState<any | null>(null);

  const cards = [
    {
      title: "Journey Future Heavens",
      description: "Future Month Insights",
      route: "/futuremonth",
      gradient: "from-purple-600 to-pink-600",
      icon: "🔮",
    },
    {
      title: "Decode Celestial Day",
      description: "Plan your perfect day",
      route: "/futureday",
      gradient: "from-teal-600 to-cyan-600",
      icon: "✨",
    },
  ];

  // Get user location and fetch daily astro
  async function handleDailyAstro() {
    setError(null);
    setLoading(true);

    try {
      // Try Telegram location first
      const loc = await locationManager.requestLocation();
      const data = await postDailyAstro(loc.latitude, loc.longitude);
      setAstroData(data);
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
        const data = await postDailyAstro(coords.latitude, coords.longitude);
        setAstroData(data);
      } catch (geoErr) {
        console.error("Geolocation failed:", geoErr);
        setError("Unable to get location. Please enable location permissions.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle swipe gestures
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <CosmicBackground />

      {/* Swipeable Container */}
      <div
        className="relative z-10 min-h-screen"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        <AnimatePresence initial={false} custom={currentSlide}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold && currentSlide === 0) {
                setCurrentSlide(1); // Swipe left to Daily Astro
              } else if (swipe > swipeConfidenceThreshold && currentSlide === 1) {
                setCurrentSlide(0); // Swipe right back to intro
              }
            }}
            initial={{ x: currentSlide === 0 ? 0 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: currentSlide === 0 ? 300 : -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col"
          >
            {currentSlide === 0 ? (
              // Slide 1: Intro Page
              <>
                {/* Hero Section */}
                <div className="flex flex-col justify-center items-center flex-1 text-center px-6 py-12">
                  <motion.div
                    className="mb-6"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-16 h-16 text-yellow-400" />
                  </motion.div>

                  {/* Main Title */}
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <span className="text-gray-900 dark:text-white">Discover Your </span>
                    <span className="text-orange-500">Cosmic </span>
                    <span className="text-purple-500">Journey</span>
                  </motion.h1>

                  {/* Spiritual Quote */}
                  <motion.div
                    className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <p className="mb-2">🪐 The universe is not outside you — it moves through you.</p>
                    <p className="mb-2">Your chart is a mirror, reflecting karma, grace, and awakening.</p>
                    <p>Enter the realm of Vedic astrology — where time speaks and the soul listens.</p>
                  </motion.div>

                  {/* Swipe Hint */}
                  <motion.p
                    className="text-gray-400 text-sm"
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ← Swipe left to explore
                  </motion.p>
                </div>

                {/* Cards Section - without Daily Astro */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm">
                  {cards.map((card, index) => (
                    <motion.div
                      key={card.route}
                      className={`relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer bg-gradient-to-br ${card.gradient} p-6 min-h-[200px] flex flex-col justify-between`}
                      onClick={() => navigate(card.route)}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.5 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                        animate={{ opacity: [0.4, 0.6, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />

                      <div className="relative z-10">
                        <div className="text-4xl mb-3">{card.icon}</div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg">
                          {card.title}
                        </h2>
                        <p className="text-white/90 text-sm drop-shadow-md">
                          {card.description}
                        </p>
                      </div>

                      <motion.div
                        className="relative z-10 mt-4"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-white/80 text-sm font-medium flex items-center gap-2">
                          Explore →
                        </span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              // Slide 2: Daily Astro Page
              <div className="flex flex-col justify-center items-center min-h-screen px-6 py-12">
                {/* Zodiac Wheel Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-8"
                >
                  <img
                    src="/assets/daily-astro-bg.png"
                    alt="Zodiac Wheel"
                    className="w-80 h-80 sm:w-96 sm:h-96 object-contain"
                  />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-3xl sm:text-4xl font-bold mb-4"
                >
                  Daily Astro
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-gray-300 text-center mb-8 max-w-md"
                >
                  Trace your daily path through the movements of the stars.
                </motion.p>

                {/* Celestial Vibe Today Button */}
                {!astroData && (
                  <motion.button
                    onClick={handleDailyAstro}
                    disabled={loading}
                    className="px-8 py-4 bg-[#4169E1] hover:bg-[#3651C7] rounded-xl shadow-lg font-semibold text-lg transition-all disabled:opacity-50"
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {loading ? "Loading..." : "Celestial Vibe Today"}
                  </motion.button>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm max-w-md"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Results */}
                {astroData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 shadow-2xl max-w-2xl w-full"
                  >
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-200 leading-relaxed bg-black/20 p-4 rounded-lg">
                        {typeof astroData === 'string' ? astroData : JSON.stringify(astroData, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                )}

                {/* Swipe Hint */}
                <motion.p
                  className="text-gray-400 text-sm mt-8"
                  animate={{ x: [5, -5, 5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Swipe right to go back →
                </motion.p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
