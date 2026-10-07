import { createFileRoute } from "@tanstack/react-router";
import { ProgressStats } from "../features/profile/components/progressStats";

export const Route = createFileRoute("/achievements")({
  component: AchievementsPage,
});

function AchievementsPage() {
  return <ProgressStats view="achievements" />;
}
