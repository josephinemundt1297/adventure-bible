import type { PlannedActivity } from "../types/plan";

export const initialPlan: PlannedActivity[] = [
  {
    id: "learn",
    title: "20 Min. lernen",
    time: "10:00",
    type: "quest",
    completed: false,
    sortOrder: 0,
  },
  {
    id: "sport",
    title: "Sport",
    time: "14:00",
    type: "personal",
    completed: false,
    sortOrder: 1,
  },
  {
    id: "project",
    title: "Projektarbeit",
    time: "16:30",
    type: "personal",
    completed: false,
    sortOrder: 2,
  },
  {
    id: "reading",
    title: "Lesen",
    time: "21:30",
    type: "personal",
    completed: false,
    sortOrder: 3,
  },
];
