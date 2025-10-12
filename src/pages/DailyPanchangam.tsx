import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { initTelegram } from "@/lib/telegram";

const DailyPanchangam = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tg = initTelegram();
    if (tg) {
      tg.ready();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      {/* Header with back button */}
      <header className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-4 text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Daily{" "}
          <span className="bg-gradient-to-r from-celestial-blue to-celestial-purple bg-clip-text text-transparent">
            Panchangam
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Discover what the stars have aligned for your daily journey
        </p>
      </header>

      {/* Content */}
      <div className="max-w-md mx-auto space-y-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Cosmic Insights</h2>
          <p className="text-muted-foreground">
            Content will be added here based on your backend API response.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyPanchangam;
