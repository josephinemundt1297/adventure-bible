import { createFileRoute } from "@tanstack/react-router";
import { DayPlan } from "../features/plan/components/dayPlan";

export const Route = createFileRoute("/plan")({
  component: PlanPage,
});

function PlanPage() {
  return <DayPlan />;
}
