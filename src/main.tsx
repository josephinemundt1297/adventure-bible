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
          colorPrimary: "#1f4d2e",
          colorText: "#3a1d10",
          colorTextSecondary: "#9a6b56",
          colorBackground: "#fff8ef",
          colorInputBackground: "#fff8ef",
          colorInputText: "#3a1d10",
          borderRadius: "1rem",
        },
        elements: {
          card: "border border-[#efc9a9] bg-[#fff8ef] shadow-sm",
          formButtonPrimary: "bg-[#1f4d2e] hover:bg-[#173b23] text-white",
          formFieldInput: "border-[#e8cdb9] bg-[#fff8ef]",
          footerActionLink: "text-[#1f4d2e]",
          headerTitle: "font-bold",
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
