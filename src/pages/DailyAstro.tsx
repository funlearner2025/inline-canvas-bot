// src/pages/DailyAstro.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { locationManager } from "@telegram-apps/sdk";
import { postDailyAstro } from "../lib/api";
import { Loader2, Undo2, AlertCircle } from "lucide-react";

export default function DailyAstro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [astroData, setAstroData] = useState<any | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Add debug log helper
  const addLog = (message: string) => {
    console.log(message);
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Get user location (Telegram first, browser fallback)
  async function getLocation() {
    setError(null);
    setLoading(true);
    addLog("Starting location fetch...");

    try {
      // Try Telegram Mini App location first
      addLog("Attempting Telegram location...");
      
      // Mount locationManager if not already mounted
      if (locationManager.mount.isAvailable()) {
        addLog("Mounting locationManager...");
        locationManager.mount();
      }
      
      // Check if location request is available
      if (!locationManager.requestLocation.isAvailable()) {
        addLog("Telegram location not available, using browser fallback");
        throw new Error("Location manager not available");
      }
      
      const loc = await locationManager.requestLocation();
      addLog(`Telegram location success: ${loc.latitude}, ${loc.longitude}`);
      return { lat: loc.latitude, lon: loc.longitude };
    } catch (e) {
      addLog(`Telegram location failed: ${e}`);

      // Fallback to browser geolocation
      try {
        addLog("Trying browser geolocation...");
        const coords = await new Promise<GeolocationCoordinates>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 8000 }
          );
        });
        addLog(`Browser location success: ${coords.latitude}, ${coords.longitude}`);
        return { lat: coords.latitude, lon: coords.longitude };
      } catch (geoErr) {
        addLog(`Browser geolocation failed: ${geoErr}`);
        setError("Unable to get location. Please enable location in Telegram or browser.");
        return null;
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle click — get location and call backend
  async function handleDailyAstro() {
    addLog("Button clicked!");
    const coords = await getLocation();
    
    if (!coords) {
      addLog("No coordinates received, aborting.");
      return;
    }

    addLog(`Sending to backend: lat=${coords.lat}, lon=${coords.lon}`);
    addLog(`Backend URL: ${import.meta.env.VITE_FLASK_API_URL || 'UNDEFINED'}`);
    
    try {
      setLoading(true);
      const data = await postDailyAstro(coords.lat, coords.lon);
      addLog(`Backend response received!`);
      
      // Show success message from backend
      setAstroData(data.message || "Location sent successfully! Check your Telegram for the astro reading.");
    } catch (e) {
      addLog(`Backend error: ${e}`);
      setError("Failed to send location to backend. Please try again later.");
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
          {/* Content without zodiac wheel */}
          {!astroData && (
            <>
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
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Celestial Vibe Today</span>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Location Error</p>
                <p className="text-red-200/80">{error}</p>
                <button
                  onClick={() => window.Telegram?.WebApp?.openSettings()}
                  className="mt-2 text-red-200 underline text-xs hover:text-white transition-colors"
                >
                  Fix Location Permissions
                </button>
              </div>
            </div>
          )}

          {/* Results Card */}
          {astroData && (
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Your Cosmic Insights</h3>
                <button
                  onClick={() => {
                    setAstroData(null);
                    setError(null);
                    setDebugLogs([]);
                  }}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Refresh
                </button>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-200 leading-relaxed bg-black/20 p-4 rounded-lg">
                  {typeof astroData === 'string' ? astroData : JSON.stringify(astroData, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Debug Logs Panel */}
          {debugLogs.length > 0 && (
            <div className="mt-4 bg-black/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4 max-h-60 overflow-y-auto">
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
                  <div key={idx} className="text-xs text-gray-300 font-mono">
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
