// src/pages/DailyAstro.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Undo2, AlertCircle, MapPin } from "lucide-react";

export default function DailyAstro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLocationRequest, setShowLocationRequest] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  
  // Check if debug mode is enabled via environment variable
  const isDebugMode = import.meta.env.VITE_DAILY_ASTRO_DEBUG_MODE === 'true';

  // Add debug log helper (only logs if debug mode is enabled)
  const addLog = (message: string) => {
    console.log(message);
    if (isDebugMode) {
      setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    }
  };

  // Request location using browser geolocation
  async function requestLocation() {
    setLoading(true);
    setError(null);
    addLog("Starting location request...");

    try {
      // Get location from browser
      addLog("Requesting browser geolocation...");
      const coords = await new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });

      addLog(`Location received: ${coords.latitude}, ${coords.longitude}`);

      // Get Telegram user ID
      const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
      const userId = telegramUser?.id;
      const username = telegramUser?.username || telegramUser?.first_name || "there";
      
      addLog(`Telegram user: ${username} (ID: ${userId || 'not available'})`);
      addLog(`Backend URL: ${import.meta.env.VITE_FLASK_API_URL}`);

      // Send location to backend
      const payload = {
        lat: coords.latitude,
        lon: coords.longitude,
        chat_id: userId
      };
      
      addLog(`Sending payload: ${JSON.stringify(payload)}`);
      
      const response = await fetch(`${import.meta.env.VITE_FLASK_API_URL}/daily-astro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      addLog(`Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        addLog(`Error response: ${errorText}`);
        throw new Error(`Backend error: ${response.status}`);
      }

      const result = await response.json();
      addLog(`Success response: ${JSON.stringify(result)}`);

      // Success - show message
      alert(`✅ Location sent! Check your Telegram chat with the bot for your Daily Astro reading.`);
      setShowLocationRequest(false);
      
    } catch (e: any) {
      console.error('Location request failed:', e);
      addLog(`ERROR: ${e.message || e}`);
      
      if (e.code === 1) {
        setError('Location permission denied. Please enable location access in your browser settings.');
      } else if (e.code === 2) {
        setError('Location unavailable. Please check your device settings.');
      } else if (e.code === 3) {
        setError('Location request timeout. Please try again.');
      } else {
        setError(`Failed: ${e.message || 'Please try again.'}`);
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle button click - show location request UI
  async function handleDailyAstro() {
    addLog("Celestial Vibe Today clicked!");
    setShowLocationRequest(true);
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
          {/* Initial View */}
          {!showLocationRequest && (
            <div className="text-center px-4">
              <h1 className="text-4xl font-bold mb-6 text-white">
                Daily Astro
              </h1>
              
              <p className="text-gray-200 text-lg mb-10 leading-relaxed max-w-md">
                Trace your daily path through the movements of the stars.
              </p>

              <button
                onClick={handleDailyAstro}
                disabled={loading}
                className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <span>Celestial Vibe Today</span>
              </button>
            </div>
          )}

          {/* Location Request View */}
          {showLocationRequest && (
            <div className="text-center px-4 w-full">
              <div className="mb-8">
                <div className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white">
                  Share Your Location
                </h2>
                <p className="text-gray-300 text-base leading-relaxed max-w-sm mx-auto">
                  We need your location to calculate your personalized Daily Astro reading based on your current position.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={requestLocation}
                  disabled={loading}
                  className="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Getting Location...</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5" />
                      <span>Share Location</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setShowLocationRequest(false);
                    setError(null);
                  }}
                  disabled={loading}
                  className="w-full px-8 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl font-medium text-gray-200 text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>

              <p className="text-gray-400 text-xs mt-6 leading-relaxed max-w-sm mx-auto">
                🔒 Your location is only used to generate your astro reading and is not stored.
              </p>
            </div>
          )}

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

          {/* Debug Logs Panel - Only show if debug mode is enabled */}
          {isDebugMode && debugLogs.length > 0 && (
            <div className="mt-6 bg-black/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4 max-h-60 overflow-y-auto w-full">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-gray-400 uppercase">Debug Logs</h4>
                <button
                  onClick={() => setDebugLogs([])}
                  className="text-xs text-gray-500 hover:text-white"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-1">
                {debugLogs.map((log, idx) => (
                  <div key={idx} className="text-xs text-gray-300 font-mono break-all">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
