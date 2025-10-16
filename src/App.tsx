// src/App.tsx

import { useEffect, useMemo } from "react";
import { Routes, Route, Navigate, Router, createMemoryRouter, createRoutesFromElements } from "react-router-dom";

//  Telegram Mini Apps integration
import { useIntegration } from "@telegram-apps/react-router-integration";

//  Pages that actually exist
import Index from "./pages/Index";
import DailyAstro from "./pages/DailyAstro";
import DailyPanchangam from "./pages/DailyPanchangam";
import NotFound from "./pages/NotFound";

export default function App() {
  //  Create a memory-based router for in-app navigation
  const navigator = useMemo(() => createMemoryRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Index />} />
        <Route path="/daily" element={<DailyAstro />} />
        <Route path="/panchangam" element={<DailyPanchangam />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  ), []);

  // Integrate Telegram router (BackButton sync)
  const [location, reactNavigator] = useIntegration(navigator);

  // Attach / detach lifecycle
  useEffect(() => {
    console.log("Telegram router integration active");
  }, []);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/daily" element={<DailyAstro />} />
        <Route path="/panchangam" element={<DailyPanchangam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
