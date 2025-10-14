import { Button } from "@/components/ui/button";

interface CosmicCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonVariant: "celestial" | "cosmic" | "mystical";
  backgroundImage: string;
  onClick?: () => void;
}

export const CosmicCard = ({
  title,
  subtitle,
  buttonText,
  buttonVariant,
  backgroundImage,
  onClick,
}: CosmicCardProps) => {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg"
      onClick={onClick}
    >
      {/* Background Image Container */}
      <div className="relative w-full aspect-[9/16] sm:aspect-[3/4]">
        <img 
          src={backgroundImage} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      </div>
      
      {/* Content Overlay */}
      <div className={`absolute inset-0 flex flex-col p-4 sm:p-6 ${
        title === "Daily Astro" 
          ? "justify-end items-center text-center pb-6 sm:pb-8" 
          : "justify-between"
      }`}>
        <div className={title === "Daily Astro" ? "mb-3 sm:mb-4" : ""}>
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg">
            {title}
          </h2>
          <p className={`text-white/95 text-sm sm:text-base leading-relaxed drop-shadow-md ${
            title === "Daily Astro" ? "mx-auto max-w-[90%]" : "max-w-[85%] sm:max-w-[200px]"
          }`}>
            {subtitle}
          </p>
        </div>
        
        <div className="w-full flex justify-center sm:justify-start">
          <Button 
            variant={buttonVariant} 
            className="rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
