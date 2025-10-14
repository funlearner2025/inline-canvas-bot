import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CosmicCard } from "@/components/CosmicCard";
import { initTelegram } from "@/lib/telegram";
import dailyAstroBg from "@/assets/daily-astro-bg.png";
import futureMonthBg from "@/assets/future-month-bg.png";
import futureDayBg from "@/assets/future-day-bg.png";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Telegram Web App
    const tg = initTelegram();
    if (tg) {
      tg.ready();
    }
  }, []);

  return (
    <div 
      className="min-h-screen bg-background w-full"
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      {/* Header */}
      <header className="mb-6 sm:mb-8 text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
          Discover Your{" "}
          <span className="bg-gradient-to-r from-cosmic-orange to-cosmic-gold bg-clip-text text-transparent">
            Cosmic
          </span>{" "}
          <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-pink bg-clip-text text-transparent">
            Journey
          </span>
        </h1>
      </header>

      {/* Cards Container */}
      <div className="max-w-lg mx-auto px-4 space-y-4 sm:space-y-6 pb-4">
        <CosmicCard
          title="Daily Astro"
          subtitle="Trace your daily path through the movements of the stars."
          buttonText="Celestial Vibe Today"
          buttonVariant="celestial"
          backgroundImage={dailyAstroBg}
          onClick={() => navigate("/daily-panchangam")}
        />

        <CosmicCard
          title="Future Month"
          subtitle="Traverse the planetary realms guiding the energies of a future month."
          buttonText="Journey Future Heavens"
          buttonVariant="cosmic"
          backgroundImage={futureMonthBg}
          onClick={() => {
            console.log("Future Month clicked");
            // Navigate to future month page when implemented
          }}
        />

        <CosmicCard
          title="Future Day"
          subtitle="Look ahead to unveil the cosmic influences of any future day"
          buttonText="Decode Celestial Day"
          buttonVariant="mystical"
          backgroundImage={futureDayBg}
          onClick={() => {
            console.log("Future Day clicked");
            // Navigate to future day page when implemented
          }}
        />
      </div>
    </div>
  );
};

export default Index;
