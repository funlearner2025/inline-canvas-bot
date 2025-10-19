// src/pages/DailyAstro.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Undo2, AlertCircle } from "lucide-react";

export default function DailyAstro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Request Daily Astro via Bot
  async function handleDailyAstro() {
    setLoading(true);
    setError(null);

    try {
      // Get Telegram user ID
      const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
      
      if (!telegramUser?.id) {
        setError("Unable to identify Telegram user. Please try again.");
        return;
      }

      // Call backend to trigger bot message with location request
      const response = await fetch(`${import.meta.env.VITE_FLASK_API_URL}/request-daily-astro-location`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: telegramUser.id,
          username: telegramUser.username || telegramUser.first_name
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      // Close the Mini App
      if (window.Telegram?.WebApp) {
        // Use MainButton to show confirmation
        alert('📍 Please check the bot chat to share your location!');
        window.Telegram.WebApp.close();
      }
      
    } catch (e) {
      console.error('Request failed:', e);
      setError('Failed to send request. Please try again or contact the bot directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/daily-astro-bg.png)',
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Safe area padding for mobile */}
      <div
        className="relative z-10 min-h-screen flex items-center justify-center p-4"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        {/* Floating Back Button - Bottom Right */}
        <button
          onClick={() => navigate('/')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl border border-white/20 transition-all hover:scale-110 active:scale-95 z-50"
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)',
            right: 'calc(env(safe-area-inset-right) + 1.5rem)',
          }}
        >
          <Undo2 className="w-6 h-6 text-white" />
        </button>

        <div className="w-full max-w-md flex flex-col items-center">
          {/* Text Content */}
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold mb-6 text-white">
              Daily Astro
            </h1>
            
            <p className="text-gray-200 text-lg mb-10 leading-relaxed max-w-md">
              Trace your daily path through the movements of the stars.
            </p>

            {/* Action Button */}
            <button
              onClick={handleDailyAstro}
              disabled={loading}
              className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Celestial Vibe Today</span>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm flex items-start gap-3 max-w-md">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Error</p>
                <p className="text-red-200/80">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
