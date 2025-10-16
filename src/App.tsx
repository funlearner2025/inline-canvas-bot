// src/App.tsx

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { init, viewport } from "@telegram-apps/sdk";

import Index from "./pages/Index";
import DailyAstro from "./pages/DailyAstro";
import DailyPanchangam from "./pages/DailyPanchangam";
import NotFound from "./pages/NotFound";

export default function App() {
  useEffect(() => {
    try {
      // Initialize Telegram Mini Apps SDK
      init();

      // Handle safe area layout
      if (viewport.mount.isAvailable()) {
        viewport.mount();
      }

      console.log("✅ Telegram Mini App initialized");
    } catch (err) {
      console.warn("⚠️ Telegram init failed:", err);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/daily" element={<DailyAstro />} />
        <Route path="/panchangam" element={<DailyPanchangam />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
