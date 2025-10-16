// src/App.tsx

import { useEffect, useMemo } from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";

//  Import official Telegram Mini Apps router integration
import { useIntegration } from "@telegram-apps/react-router-integration";
import { initNavigator } from "@telegram-apps/sdk-react";

//  Import your app pages
import Home from "./pages/Home";
import DailyAstro from "./pages/DailyAstro";
import FutureMonth from "./pages/FutureMonth";
import FutureDay from "./pages/FutureDay";

export default function App() {
  // Initialize a Telegram-compatible navigator (works with BackButton)
  const navigator = useMemo(() => initNavigator("app-navigator"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Attach/detach Telegram BackButton sync
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/daily" element={<DailyAstro />} />
        <Route path="/futuremonth" element={<FutureMonth />} />
        <Route path="/futureday" element={<FutureDay />} />
        {/* Redirect any unknown path to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
