import { getJournalDate } from "./dayJournal";
import { apiRequest } from "./apiClient";

type BackendJournalEntryType = "EVENT" | "REFLECTION";

export interface BackendJournalEntry {
  id: string;
  userProfileId: string;
  entryDate: string | null;
  entryTime: string | null;
  type: BackendJournalEntryType;
  title: string;
  content: string | null;
  questLogId: string | null;
  hpCheckId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReflectionInput {
  challenging: string;
  good: string;
  grateful: string;
  tomorrow: string;
}

function getCurrentEntryTime(date = new Date()) {
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatReflectionContent(reflection: ReflectionInput) {
  return [
    `Was war gut?\n${reflection.good || "Nicht ausgefüllt."}`,
    `Was war herausfordernd?\n${reflection.challenging || "Nicht ausgefüllt."}`,
    `Wofür bin ich dankbar?\n${reflection.grateful || "Nicht ausgefüllt."}`,
    `Notiz für morgen\n${reflection.tomorrow || "Nicht ausgefüllt."}`,
  ].join("\n\n");
}

export async function saveBackendReflection(input: {
  getToken?: () => Promise<string | null>;
  reflection: ReflectionInput;
}) {
  return apiRequest<{ data: BackendJournalEntry }>("/api/journal-entries", {
    getToken: input.getToken,
    method: "POST",
    body: {
      entryDate: getJournalDate(),
      entryTime: getCurrentEntryTime(),
      type: "REFLECTION",
      title: "Abendliche Reflexion",
      content: formatReflectionContent(input.reflection),
    },
  });
}
