import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CosmicCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonVariant: "celestial" | "cosmic" | "mystical";
  backgroundImage: string;
  onClick?: () => void;
}

/**
 * Cosmic Card Component with Framer Motion animations
 * GPU-accelerated, optimized for 60fps and 120fps mobile displays
 */
export const CosmicCard = ({
  title,
  subtitle,
  buttonText,
  buttonVariant,
  backgroundImage,
  onClick,
}: CosmicCardProps) => {
  return (
    <motion.div
      className="relative w-full rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Background Image Container */}
      <div className="relative w-full aspect-[9/16] sm:aspect-[3/4]">
        <motion.img 
          src={backgroundImage} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Overlay Gradient - Enhanced with glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        
        {/* Animated glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Content Overlay */}
      <div className={`absolute inset-0 flex flex-col p-4 sm:p-6 ${
        title === "Daily Astro" 
          ? "justify-end items-center text-center pb-6 sm:pb-8" 
          : "justify-between"
      }`}>
        <motion.div 
          className={title === "Daily Astro" ? "mb-3 sm:mb-4" : ""}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg">
            {title}
          </h2>
          <p className={`text-white/95 text-sm sm:text-base leading-relaxed drop-shadow-md ${
            title === "Daily Astro" ? "mx-auto max-w-[90%]" : "max-w-[85%] sm:max-w-[200px]"
          }`}>
            {subtitle}
          </p>
        </motion.div>
        
        <div className="w-full flex justify-center sm:justify-start">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant={buttonVariant} 
              className="rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
