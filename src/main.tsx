import { ClerkProvider } from "@clerk/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: "#294b32",
          colorBackground: "#fbf5ea",
          colorInputText: "#263127",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "border border-[#ddceb8] bg-[#fbf5ea] shadow-sm",
          formButtonPrimary: "bg-[#294b32] hover:bg-[#203b28] text-white",
          formFieldInput: "border-[#ddceb8] bg-[#fbf5ea]",
          footerActionLink: "text-[#294b32]",
          headerTitle: "font-bold",
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
