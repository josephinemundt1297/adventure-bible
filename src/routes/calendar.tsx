import { createFileRoute } from "@tanstack/react-router";
import { CalendarView } from "../features/calendar/components/calendarView";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  return <CalendarView />;
}
