// src/pages/Index.tsx

import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* ✅ Hero Section */}
      <div
        className="flex flex-col justify-center items-center flex-1 text-center bg-cover bg-center"
        // ✅ Use root-based path since assets are under /public/assets/
        style={{ backgroundImage: "url('/assets/daily-astro-bg.png')" }}
      >
        <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">
          🌞 Celestial Vibe Today
        </h1>
        <p className="text-sm text-gray-300 mb-6">
          Discover your Panchangam & Nakshatra for the day
        </p>
        <button
          onClick={() => navigate("/daily")}
          className="px-6 py-3 bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-500 transition"
        >
          Explore Daily Astro
        </button>
      </div>

      {/* ✅ Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-900">
        {/* Daily Astro Card */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          onClick={() => navigate("/daily")}
        >
          <img
            src="/assets/daily-astro-bg.png"
            alt="Daily Astro"
            className="w-full h-48 object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold">Celestial Vibe Today</h2>
            <p className="text-xs text-gray-300 mt-1">Daily Astro Insights</p>
          </div>
        </div>

        {/* Future Month Card */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          onClick={() => navigate("/futuremonth")}
        >
          <img
            src="/assets/future-month-bg.png"
            alt="Future Month"
            className="w-full h-48 object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold">Journey Future Heavens</h2>
            <p className="text-xs text-gray-300 mt-1">Future Month Insights</p>
          </div>
        </div>

        {/* Future Day Card */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          onClick={() => navigate("/futureday")}
        >
          <img
            src="/assets/future-day-bg.png"
            alt="Future Day"
            className="w-full h-48 object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold">Decode Celestial Day</h2>
            <p className="text-xs text-gray-300 mt-1">Plan your perfect day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
