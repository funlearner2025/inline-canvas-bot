// src/pages/DailyAstro.tsx

import { useState } from "react";
import { locationManager } from "@telegram-apps/sdk"; // ✅ fixed import
import { postDailyAstro } from "../lib/api";

export default function DailyAstro() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [astroData, setAstroData] = useState<string | null>(null);

  // ✅ Step 1: Get user location (Telegram first, browser fallback)
  async function getLocation() {
    setError(null);
    setLoading(true);

    try {
      // Try Telegram Mini App location first
      const loc = await locationManager.requestLocation();
      return { lat: loc.latitude, lon: loc.longitude };
    } catch (e) {
      console.warn("Telegram location failed:", e);

      // Fallback to browser geolocation
      try {
        const coords = await new Promise<GeolocationCoordinates>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 8000 }
          );
        });
        return { lat: coords.latitude, lon: coords.longitude };
      } catch (geoErr) {
        console.error("Browser geolocation failed:", geoErr);
        setError("Unable to get location. Please enable location in Telegram or browser.");
        return null;
      }
    } finally {
      setLoading(false);
    }
  }

  // ✅ Step 2: Handle click — get location and call backend
  async function handleDailyAstro() {
    const coords = await getLocation();
    if (!coords) return;

    try {
      setLoading(true);
      const data = await postDailyAstro(coords.lat, coords.lon);
      setAstroData(data?.message || "No data received");
    } catch (e) {
      console.error("Daily Astro fetch failed:", e);
      setError("Failed to fetch daily astro data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Step 3: Render
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-2xl font-semibold mb-6">🌞 Celestial Vibe Today</h1>

      <button
        onClick={handleDailyAstro}
        disabled={loading}
        className="px-6 py-3 bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-500 disabled:opacity-60 transition"
      >
        {loading ? "Fetching your stars..." : "Get Today's Astro"}
      </button>

      {error && (
        <p className="text-red-400 mt-4 text-sm text-center max-w-sm">{error}</p>
      )}

      {astroData && (
        <pre className="bg-gray-800 mt-6 p-4 rounded-xl text-sm whitespace-pre-wrap text-left max-w-md">
          {astroData}
        </pre>
      )}

      {/* ✅ Works with current SDK version */}
      <button
        onClick={() => window.Telegram?.WebApp?.openSettings()}
        className="mt-4 text-blue-400 underline text-sm"
      >
        Fix Location Permissions
      </button>
    </div>
  );
}
