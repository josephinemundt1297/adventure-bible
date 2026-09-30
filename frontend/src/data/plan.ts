import type { PlannedActivity } from "../types/plan";

export const initialPlan: PlannedActivity[] = [
  {
    id: "learn",
    title: "20 Min. lernen",
    time: "10:00",
    type: "quest",
    completed: false,
  },
  {
    id: "sport",
    title: "Sport",
    time: "14:00",
    type: "personal",
    completed: false,
  },
  {
    id: "project",
    title: "Projektarbeit",
    time: "16:30",
    type: "personal",
    completed: false,
  },
  {
    id: "reading",
    title: "Lesen",
    time: "21:30",
    type: "personal",
    completed: false,
  },
];
