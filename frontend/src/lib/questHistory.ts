const QUEST_HISTORY_KEY = "adventure-bible:quest-history";

function readHistory(): string[] {
  const stored = localStorage.getItem(QUEST_HISTORY_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    localStorage.removeItem(QUEST_HISTORY_KEY);
    return [];
  }
}

export function readCompletedQuestIds(): string[] {
  return readHistory();
}

export function recordQuestCompletion(questId: string): void {
  const history = readHistory();
  if (history.includes(questId)) return;
  localStorage.setItem(QUEST_HISTORY_KEY, JSON.stringify([...history, questId]));
}
