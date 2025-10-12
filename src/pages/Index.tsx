import { useEffect } from "react";
import { CosmicCard } from "@/components/CosmicCard";
import { initTelegram } from "@/lib/telegram";
import dailyAstroBg from "@/assets/daily-astro-bg.jpg";
import futureMonthBg from "@/assets/future-month-bg.jpg";
import futureDayBg from "@/assets/future-day-bg.png";

const Index = () => {
  useEffect(() => {
    // Initialize Telegram Web App
    const tg = initTelegram();
    if (tg) {
      tg.ready();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
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
      <div className="max-w-md mx-auto space-y-6">
        <CosmicCard
          title="Daily Panchangam"
          subtitle="Discover what the stars have aligned for your daily journey"
          buttonText="Celestial Vibe Today"
          buttonVariant="celestial"
          backgroundImage={dailyAstroBg}
          onClick={() => {
            console.log("Daily Panchangam clicked");
            // Navigate to daily page when implemented
          }}
        />

        <CosmicCard
          title="Future Month"
          subtitle="Traverse the planetary waters guiding the energies of a future month"
          buttonText="Explore Future Horizons"
          buttonVariant="cosmic"
          backgroundImage={futureMonthBg}
          onClick={() => {
            console.log("Future Month clicked");
            // Navigate to future month page when implemented
          }}
        />

        <CosmicCard
          title="Future Day"
          subtitle="Look ahead to meet the cosmic influences of any future day"
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
