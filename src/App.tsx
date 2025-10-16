// src/App.tsx

import { useEffect, useMemo } from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";

//  Telegram Mini Apps integration
import { useIntegration } from "@telegram-apps/react-router-integration";
import { initNavigator } from "@telegram-apps/sdk-react";

//  Pages that actually exist
import Index from "./pages/Index";
import DailyAstro from "./pages/DailyAstro";
import DailyPanchangam from "./pages/DailyPanchangam";
import NotFound from "./pages/NotFound";

export default function App() {
  const navigator = useMemo(() => initNavigator("app-navigator"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/daily" element={<DailyAstro />} />
        <Route path="/panchangam" element={<DailyPanchangam />} />
        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
