// src/pages/Index.tsx

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Calendar, CalendarDays } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Daily Astro",
      description: "Trace your daily path through the movements of the stars",
      route: "/dailyastro",
      gradient: "from-indigo-600 to-purple-600",
      icon: Sparkles,
    },
    {
      title: "Future Month",
      description: "Journey through future heavens and monthly insights",
      route: "/futuremonth",
      gradient: "from-purple-600 to-pink-600",
      icon: Calendar,
    },
    {
      title: "Future Day",
      description: "Decode celestial day and plan your perfect day",
      route: "/futureday",
      gradient: "from-teal-600 to-cyan-600",
      icon: CalendarDays,
    },
  ];

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

      <div 
        className="relative z-10 min-h-screen flex flex-col" 
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        {/* Header Section */}
        <div className="flex flex-col justify-center items-center flex-1 text-center px-6 py-12">
          <motion.div 
            className="mb-6" 
            animate={{ rotate: [0, 360] }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </motion.div>

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
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-t from-black/40 to-transparent">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
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
                  <IconComponent className="w-12 h-12 mb-3 text-white" />
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg">{card.title}</h2>
                  <p className="text-white/90 text-sm drop-shadow-md">{card.description}</p>
                </div>
                <motion.div 
                  className="relative z-10 mt-4" 
                  whileHover={{ x: 5 }} 
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white/80 text-sm font-medium">Explore →</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
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
