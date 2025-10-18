// src/pages/Index.tsx

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Sparkles } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Celestial Vibe Today",
      description: "Daily Astro Insights",
      route: "/daily",
      gradient: "from-indigo-600 to-purple-600",
      icon: "🌞",
    },
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

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <CosmicBackground />

      {/* Safe area padding for mobile Telegram */}
      <div
        className="relative z-10 min-h-screen flex flex-col"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        {/* Hero Section */}
        <motion.div
          className="flex flex-col justify-center items-center flex-1 text-center px-6 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Cosmic Insights
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg sm:text-xl mb-8 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover your Panchangam & Nakshatra guided by the stars
          </motion.p>

          <motion.button
            onClick={() => navigate("/daily")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Explore Daily Astro
          </motion.button>
        </motion.div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm">
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
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
      </div>
    </div>
  );
}
