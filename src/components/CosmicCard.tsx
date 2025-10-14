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
      className="relative w-full h-[400px] rounded-2xl overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
        <div className="flex-1" />
        <div className="space-y-4">
          <h2 className="text-white text-3xl font-bold">{title}</h2>
          <p className="text-white/90 text-sm max-w-[280px] mx-auto">{subtitle}</p>
        </div>
        
        <div className="flex-1 flex items-end pb-8">
          <Button variant={buttonVariant} className="rounded-lg">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
