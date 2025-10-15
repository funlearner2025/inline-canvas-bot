// src/pages/DailyAstro.tsx

import { useEffect, useMemo, useState } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { postDailyAstro } from '@/lib/api';

type Loc = { lat: number; lon: number; accuracy?: number };

export default function DailyAstro() {
  const { tg } = useTelegram();
  const [loc, setLoc] = useState<Loc | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canRequest = useMemo(() => Boolean(tg?.locationManager?.requestLocation), [tg]);

  async function requestLocation() {
    setMsg(null);
    try {
      if (canRequest) {
        const p = await tg!.locationManager!.requestLocation();
        setLoc({ lat: p.latitude, lon: p.longitude, accuracy: p.accuracy });
        return;
      }

      // Fallback if LocationManager is unavailable
      if ('geolocation' in navigator) {
        await new Promise<void>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude, accuracy: pos.coords.accuracy });
              resolve();
            },
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
          );
        });
        return;
      }

      throw new Error('Location not supported');
    } catch (e: any) {
      setMsg(e?.message ?? 'Failed to get location');
    }
  }

  async function submit() {
    if (!loc) return;
    setBusy(true);
    setMsg(null);
    try {
      const payload = { lat: loc.lat, lon: loc.lon };
      const res = await postDailyAstro(payload);
      setMsg('✨ Request sent. Check Telegram for your Daily Astro!');
      console.log('Daily Astro response:', res);
    } catch (e: any) {
      setMsg(e?.message ?? 'Failed to send request');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    requestLocation(); // Auto request on first render
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white"
         style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="mx-auto max-w-md px-4 py-6 space-y-4">
        <header className="text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-wide">Celestial Vibe Today</h1>
          <p className="text-sm text-gray-300">Share your location to get today's astrological insights.</p>
        </header>

        <section className="rounded-2xl bg-white/5 backdrop-blur-sm shadow-xl ring-1 ring-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Location</span>
            <button
              onClick={requestLocation}
              className="px-3 py-1.5 text-sm rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {loc ? 'Re-detect' : 'Detect'}
            </button>
          </div>

          <div className="rounded-xl bg-black/30 p-3 text-sm">
            {loc
              ? (
                <div className="space-y-1">
                  <div>Latitude: <span className="text-teal-300">{loc.lat.toFixed(6)}</span></div>
                  <div>Longitude: <span className="text-teal-300">{loc.lon.toFixed(6)}</span></div>
                  {typeof loc.accuracy === 'number' && <div>Accuracy: ±{Math.round(loc.accuracy)}m</div>}
                </div>
              )
              : <div className="text-gray-400">No location yet.</div>
            }
          </div>

          <button
            disabled={!loc || busy}
            onClick={submit}
            className="w-full rounded-xl py-3 font-medium bg-gradient-to-r from-indigo-500 to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition shadow-lg"
          >
            {busy ? 'Sending…' : 'Send to Backend'}
          </button>

          {!!msg && (
            <div className="text-xs text-gray-300">{msg}</div>
          )}

          {!canRequest && (
            <p className="text-xs text-amber-300">
              LocationManager not available; using browser geolocation fallback.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
