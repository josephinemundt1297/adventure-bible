import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "../components/ui/emptyState";
import { QuestRecommendation } from "../features/quests/components/questRecommendation";
import type { HpState } from "../types/hp";

const HP_STATE_KEY = "adventure-bible:hp-state";

export const Route = createFileRoute("/quests")({
  component: QuestsPage,
});

function QuestsPage() {
  const [state, setState] = useState<HpState | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(HP_STATE_KEY);
    if (!stored) return;

    try {
      setState(JSON.parse(stored) as HpState);
    } catch {
      sessionStorage.removeItem(HP_STATE_KEY);
    }
  }, []);

  if (!state) {
    return (
      <EmptyState
        title="Noch keine Quest-Empfehlung"
        description="Starte zuerst einen HP-Check, damit wir eine Quest passend zu deinem aktuellen Zustand auswählen können."
        action={
          <Link to="/hp-check" className="btn btn-primary w-full">
            HP-Check starten
          </Link>
        }
      />
    );
  }

  return <QuestRecommendation state={state} />;
}
