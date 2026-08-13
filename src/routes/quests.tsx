import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
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
      <section className="mx-auto max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Noch keine Quest-Empfehlung</h1>
        <p className="text-sm leading-6 text-base-content/70">
          Starte zuerst einen HP-Check, damit wir eine Quest passend zu deinem aktuellen Zustand auswählen können.
        </p>
        <Link to="/hp-check" className="btn btn-primary w-full">
          HP-Check starten
        </Link>
      </section>
    );
  }

  return <QuestRecommendation state={state} />;
}
