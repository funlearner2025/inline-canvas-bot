// src/App.tsx

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { init, viewport } from "@telegram-apps/sdk";
import { TelegramThemeProvider } from "@/components/TelegramThemeProvider";

import Index from "./pages/Index";
import DailyAstro from "./pages/DailyAstro";
import FutureMonth from "./pages/FutureMonth";
import FutureDay from "./pages/FutureDay";
import NotFound from "./pages/NotFound";

export default function App() {
  useEffect(() => {
    try {
      // Initialize Telegram Mini Apps SDK
      init();

      // Handle safe area layout and expand to full height
      if (viewport.mount.isAvailable()) {
        viewport.mount();
        viewport.expand();
      }

      // Enable closing confirmation (optional)
      viewport.bindCssVars();

      console.log("✅ Telegram Mini App initialized");
    } catch (err) {
      console.warn("⚠️ Telegram init failed:", err);
    }
  }, []);

  return (
    <TelegramThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dailyastro" element={<DailyAstro />} />
          <Route path="/futuremonth" element={<FutureMonth />} />
          <Route path="/futureday" element={<FutureDay />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TelegramThemeProvider>
  );
}
