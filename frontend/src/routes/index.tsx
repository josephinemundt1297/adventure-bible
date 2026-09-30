import { createFileRoute } from "@tanstack/react-router";
import { HomeDashboard } from "../features/home/components/homeDashboard";

export const Route = createFileRoute("/")({
  component: HomeDashboard,
});
