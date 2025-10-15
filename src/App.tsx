// src/App.tsx

import { Routes, Route, Link } from 'react-router-dom';
import DailyAstro from './pages/DailyAstro';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-white text-black space-y-6 py-6 px-4"
               style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <h1 className="text-center text-2xl font-bold">
              Discover Your <span className="bg-gradient-to-r from-orange-400 to-fuchsia-500 text-transparent bg-clip-text">Cosmic Journey</span>
            </h1>

            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-md bg-black text-white">
                <img
                  src="/assets/daily-astro-bg.png"
                  alt="Daily Astro"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold">Daily Astro</h2>
                  <p className="text-sm text-gray-300">Trace your daily path through the movements of the stars.</p>
                  <Link to="/daily">
                    <button className="mt-2 w-full rounded-xl bg-indigo-600 text-white py-2 font-medium hover:brightness-110 transition">
                      Celestial Vibe Today
                    </button>
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-md bg-black text-white">
                <img
                  src="/assets/future-month-bg.png"
                  alt="Future Month"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold">Future Month</h2>
                  <p className="text-sm text-gray-300">Traverse the planetary realms guiding the energies of a future month.</p>
                  <Link to="/futuremonth">
                    <button className="mt-2 w-full rounded-xl bg-orange-500 text-white py-2 font-medium hover:brightness-110 transition">
                      Journey Future Heavens
                    </button>
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-md bg-black text-white">
                <img
                  src="/assets/future-day-bg.png"
                  alt="Future Day"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold">Future Day</h2>
                  <p className="text-sm text-gray-300">Look ahead to unveil the cosmic influences of any future day.</p>
                  <Link to="/futureday">
                    <button className="mt-2 w-full rounded-xl bg-emerald-600 text-white py-2 font-medium hover:brightness-110 transition">
                      Decode Celestial Day
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <Route path="/daily" element={<DailyAstro />} />
      <Route path="/futuremonth" element={<div className="text-white p-6">Future Month (Coming Soon)</div>} />
      <Route path="/futureday" element={<div className="text-white p-6">Future Day (Coming Soon)</div>} />
    </Routes>
  );
}
