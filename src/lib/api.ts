// src/lib/api.ts

const BASE_URL = import.meta.env.VITE_FLASK_API_URL;

export type DailyAstroPayload = {
  lat: number;
  lon: number;
  chat_id?: number | string; // optional, fallback on server
};

/**
 * Sends user location to Flask backend (/dailyastro)
 * for Celestial Vibe Today (Daily Astro).
 */
export async function postDailyAstro(data: DailyAstroPayload) {
  const res = await fetch(`${BASE_URL}/dailyastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Daily Astro failed: ${res.status} - ${errorText}`);
  }

  const result = await res.json();
  return result;
}
