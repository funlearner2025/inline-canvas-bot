// src/pages/Index.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
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

  async function handleDailyAstro() {
    setError(null);
    setLoading(true);

    try {
      const loc = await locationManager.requestLocation();
      const data = await postDailyAstro(loc.latitude, loc.longitude);
      setAstroData(data);
    } catch (e) {
      console.warn("Telegram location failed:", e);
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

  // Swipe detection - requires significant movement to prevent accidental triggers
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    
    // Only trigger on significant horizontal swipe
    if (offset.x < -150 && Math.abs(velocity.x) > 300 && currentSlide === 0) {
      setCurrentSlide(1); // Swipe left to Daily Astro
    } else if (offset.x > 150 && Math.abs(velocity.x) > 300 && currentSlide === 1) {
      setCurrentSlide(0); // Swipe right back to intro
    }
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Deep Blue Cosmic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#1a1f4a] to-[#0f1333]" />
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen" style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ x: currentSlide === 0 ? 0 : "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: currentSlide === 0 ? "-100%" : "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col"
            style={{ touchAction: "pan-y" }}
          >
            {currentSlide === 0 ? (
              // Intro Page
              <div className="flex flex-col min-h-screen">
                <div className="flex flex-col justify-center items-center flex-1 text-center px-6 py-12">
                  <motion.div className="mb-6" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    <Sparkles className="w-16 h-16 text-yellow-400" />
                  </motion.div>

                  <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
                    <span className="text-gray-900 dark:text-white">Discover Your </span>
                    <span className="text-orange-500">Cosmic </span>
                    <span className="text-purple-500">Journey</span>
                  </motion.h1>

                  <motion.div className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
                    <p className="mb-2">🪐 The universe is not outside you — it moves through you.</p>
                    <p className="mb-2">Your chart is a mirror, reflecting karma, grace, and awakening.</p>
                    <p>Enter the realm of Vedic astrology — where time speaks and the soul listens.</p>
                  </motion.div>

                  <motion.p className="text-gray-400 text-sm mt-4" animate={{ x: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
                    ← Swipe left to explore
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-t from-black/40 to-transparent">
                  {cards.map((card, index) => (
                    <motion.div key={card.route} className={`relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer bg-gradient-to-br ${card.gradient} p-6 min-h-[200px] flex flex-col justify-between`} onClick={() => navigate(card.route)} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * index, duration: 0.5 }} whileHover={{ scale: 1.03, y: -5 }} whileTap={{ scale: 0.98 }}>
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" animate={{ opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                      <div className="relative z-10">
                        <div className="text-4xl mb-3">{card.icon}</div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg">{card.title}</h2>
                        <p className="text-white/90 text-sm drop-shadow-md">{card.description}</p>
                      </div>
                      <motion.div className="relative z-10 mt-4" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <span className="text-white/80 text-sm font-medium">Explore →</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Daily Astro Page
              <div className="flex flex-col justify-between min-h-screen px-6 py-8">
                <div>
                  <button onClick={() => { setCurrentSlide(0); setAstroData(null); setError(null); }} className="mb-4 text-white/60 hover:text-white transition-colors">← Back</button>
                  <motion.p className="text-gray-400 text-sm" animate={{ x: [5, -5, 5] }} transition={{ duration: 2, repeat: Infinity }}>
                    Swipe right to go back →
                  </motion.p>
                </div>

                {!astroData ? (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }} className="mb-16">
                      <img src="/assets/daily-astro-bg.png" alt="Zodiac Wheel" className="w-72 h-72 sm:w-80 sm:h-80 object-contain" />
                    </motion.div>

                    <div className="text-center">
                      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-4xl font-bold mb-6 text-white">
                        Daily Astro
                      </motion.h2>

                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-white/80 text-center mb-10 max-w-md mx-auto text-lg leading-relaxed">
                        Trace your daily path through the movements of the stars.
                      </motion.p>

                      <motion.button onClick={handleDailyAstro} disabled={loading} className="px-12 py-4 bg-[#3d5afe] hover:bg-[#3451e3] rounded-2xl shadow-lg font-semibold text-white text-lg transition-all disabled:opacity-50" whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
                        {loading ? "Loading..." : "Celestial Vibe Today"}
                      </motion.button>

                      {error && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm max-w-md mx-auto">{error}</motion.div>
                      )}
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col justify-center">
                    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 shadow-2xl max-w-2xl w-full mx-auto">
                      <h3 className="text-2xl font-bold mb-4 text-white">Your Cosmic Insights</h3>
                      <div className="prose prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm text-gray-200 leading-relaxed bg-black/20 p-4 rounded-lg">{typeof astroData === 'string' ? astroData : JSON.stringify(astroData, null, 2)}</pre>
                      </div>
                      <button onClick={() => setAstroData(null)} className="mt-6 px-6 py-3 bg-[#3d5afe] hover:bg-[#3451e3] rounded-xl text-white font-semibold transition-all">Try Again</button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
