export interface PlannedActivity {
  id: string;
  title: string;
  time: string;
  type: "quest" | "personal";
  completed: boolean;
}
