import { ClerkProvider } from "@clerk/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { clerkAppearance } from "./app/clerkAppearance";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
      console.error("Service Worker konnte nicht registriert werden.", error);
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider afterSignOutUrl="/" appearance={clerkAppearance}>
      <App />
    </ClerkProvider>
  </StrictMode>,
);
