import "dotenv/config";

const DEFAULT_PORT = 3000;

function readPort(value: string | undefined): number {
  if (!value) {
    return DEFAULT_PORT;
  }

  const port = Number(value);
  return Number.isInteger(port) && port > 0 ? port : DEFAULT_PORT;
}

function isConfiguredSecret(value: string | undefined): boolean {
  return Boolean(value && !value.includes("dein_") && !value.startsWith("YOUR_"));
}

const nodeEnv = process.env.NODE_ENV ?? "development";
const clerkAuthEnabled =
  isConfiguredSecret(process.env.CLERK_PUBLISHABLE_KEY) &&
  isConfiguredSecret(process.env.CLERK_SECRET_KEY);

if (nodeEnv === "production" && !clerkAuthEnabled) {
  throw new Error(
    "CLERK_PUBLISHABLE_KEY und CLERK_SECRET_KEY müssen in production gesetzt sein.",
  );
}

export const config = {
  nodeEnv,
  port: readPort(process.env.PORT),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
  clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  clerkSecretKey: process.env.CLERK_SECRET_KEY,
  clerkAuthEnabled,
};
