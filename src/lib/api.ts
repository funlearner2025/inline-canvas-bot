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
 * Request daily astro via bot keyboard (triggers bot message with location button)
 */
export async function requestDailyAstroViaBot(userId: number, username?: string) {
  const res = await fetch(`${BASE_URL}/request-daily-astro-location`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, username }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Request failed: ${res.status} - ${errorText}`);
  }

  const result = await res.json();
  return result;
}

/**
 * Sends user location to Flask backend (/daily_astro)
 * for Celestial Vibe Today (Daily Astro).
 */
export async function postDailyAstro(lat: number, lon: number) {
  console.log("[API] postDailyAstro called with:", { lat, lon });
  console.log("[API] Backend URL:", BASE_URL);
  console.log("[API] Full endpoint:", `${BASE_URL}/daily_astro`);
  
  const payload = { lat, lon };
  console.log("[API] Sending payload:", payload);
  
  const res = await fetch(`${BASE_URL}/daily_astro`, {
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
  console.log('[API] searchLocation called with query:', query);
  
  if (!query || query.length < 3) {
    console.log('[API] Query too short, returning empty array');
    return [];
  }

  const url = `${BASE_URL}/location_auto_complete?query=${encodeURIComponent(query)}`;
  console.log('[API] Calling autocomplete endpoint:', url);

  try {
    const res = await fetch(url);
    console.log('[API] Autocomplete response status:', res.status, res.statusText);
    
    if (!res.ok) {
      console.warn('[API] Autocomplete failed with status:', res.status);
      const errorText = await res.text();
      console.warn('[API] Error response:', errorText);
      return [];
    }

    const data = await res.json();
    console.log('[API] Autocomplete response data:', data);
    console.log('[API] Number of predictions:', data.predictions?.length || 0);
    return data.predictions || [];
  } catch (error) {
    console.error('[API] Location search error:', error);
    return [];
  }
}
