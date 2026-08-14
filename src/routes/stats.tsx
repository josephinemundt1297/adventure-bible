import { createFileRoute } from "@tanstack/react-router";
import { ProgressStats } from "../features/profile/components/progressStats";

export const Route = createFileRoute("/stats")({
  component: StatsPage,
});

function StatsPage() {
  return <ProgressStats />;
}
