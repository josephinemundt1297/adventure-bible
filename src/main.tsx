import { ClerkProvider } from "@clerk/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
      console.error("Service Worker konnte nicht registriert werden.", error);
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: "#294b32",
          colorBackground: "#fbf5ea",
          colorForeground: "#263127",
          colorInput: "#fffdf8",
          colorInputForeground: "#263127",
          colorBorder: "#ddceb8",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "border border-[#ddceb8] bg-[#fbf5ea] shadow-sm",
          formButtonPrimary: "bg-[#294b32] hover:bg-[#203b28] text-white",
          formFieldInput: "border-[#ddceb8] bg-[#fffdf8] text-[#263127]",
          footerActionLink: "text-[#294b32]",
          headerTitle: "font-bold",
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
