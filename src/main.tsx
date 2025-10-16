// src/main.tsx

// Step 1: Import Telegram Mini Apps SDK initialization functions
import { init, viewport } from "@telegram-apps/sdk"; 

// Initialize the Telegram Mini Apps SDK as early as possible
init();

// (Optional) Mount viewport for safe-area support (status bar, notches, etc.)
if (viewport.mount.isAvailable()) {
  viewport.mount();
}

// Step 2: Standard React + Vite setup (unchanged)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Tailwind styles or your global CSS file
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
