import type { ClerkProviderProps } from "@clerk/react";

const mainTheme = {
  forest: "#294b32",
  parchment: "#fbf5ea",
  ink: "#263127",
  paper: "#fffdf8",
  border: "#ddceb8",
} as const;

export const clerkAppearance: NonNullable<ClerkProviderProps["appearance"]> = {
  cssLayerName: "clerk",
  variables: {
    colorPrimary: mainTheme.forest,
    colorBackground: mainTheme.parchment,
    colorForeground: mainTheme.ink,
    colorInput: mainTheme.paper,
    colorInputForeground: mainTheme.ink,
    colorBorder: mainTheme.border,
    colorRing: mainTheme.forest,
    borderRadius: "0.75rem",
  },
  elements: {
    card: "clerk-card",
    formButtonPrimary: "clerk-primary-button",
    formFieldInput: "clerk-form-input",
    footerActionLink: "clerk-action-link",
    headerTitle: "font-bold",
  },
};

export const userButtonAppearance: NonNullable<ClerkProviderProps["appearance"]> = {
  elements: {
    avatarBox: "size-9",
  },
};
