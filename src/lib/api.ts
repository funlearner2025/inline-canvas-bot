// src/lib/api.ts

const BASE_URL = import.meta.env.VITE_FLASK_API_URL;

export type DailyAstroPayload = {
  lat: number;
  lon: number;
  chat_id?: number | string; // optional, fallback on server
};

export type FutureMonthPayload = {
  location: string;
  month: number;
  year: number;
  chat_id?: number | string;
};

export type FutureDayPayload = {
  location: string;
  day: number;
  month: number;
  year: number;
  chat_id?: number | string;
};

/**
 * Sends user location to Flask backend (/dailyastro)
 * for Celestial Vibe Today (Daily Astro).
 */
export async function postDailyAstro(lat: number, lon: number) {
  console.log("[API] postDailyAstro called with:", { lat, lon });
  console.log("[API] Backend URL:", BASE_URL);
  console.log("[API] Full endpoint:", `${BASE_URL}/dailyastro`);
  
  const payload = { lat, lon };
  console.log("[API] Sending payload:", payload);
  
  const res = await fetch(`${BASE_URL}/dailyastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  console.log("[API] Response status:", res.status, res.statusText);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("[API] Error response:", errorText);
    throw new Error(`Daily Astro failed: ${res.status} - ${errorText}`);
  }

  const result = await res.json();
  console.log("[API] Success response:", result);
  return result;
}

/**
 * Sends location and month/year to Flask backend for future month predictions
 */
export async function postFutureMonth(data: FutureMonthPayload) {
  const res = await fetch(`${BASE_URL}/futuremonth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Future Month failed: ${res.status} - ${errorText}`);
  }

  const result = await res.json();
  return result;
}

/**
 * Sends location and date to Flask backend for future day predictions
 */
export async function postFutureDay(data: FutureDayPayload) {
  const res = await fetch(`${BASE_URL}/futureday`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Future Day failed: ${res.status} - ${errorText}`);
  }

  const result = await res.json();
  return result;
}

/**
 * Autocomplete location search via Flask webhook (Google Maps API)
 */
export async function searchLocation(query: string): Promise<string[]> {
  if (!query || query.length < 3) return [];

  try {
    const res = await fetch(`${BASE_URL}/autocomplete?query=${encodeURIComponent(query)}`);
    
    if (!res.ok) {
      console.warn('Autocomplete failed:', res.status);
      return [];
    }

    const data = await res.json();
    return data.predictions || [];
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
}
