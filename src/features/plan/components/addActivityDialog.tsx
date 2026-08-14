import { useState } from "react";
import { quests } from "../../../data/quests";
import type { PlannedActivity } from "../../../types/plan";

interface AddActivityDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (activity: PlannedActivity) => void;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AddActivityDialog({ open, onClose, onAdd }: AddActivityDialogProps) {
  const [kind, setKind] = useState<"quest" | "personal">("quest");
  const [questId, setQuestId] = useState(quests[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("12:00");

  if (!open) return null;

  const selectedQuest = quests.find((quest) => quest.id === questId);

  function close() {
    setTitle("");
    setTime("12:00");
    setKind("quest");
    setQuestId(quests[0]?.id ?? "");
    onClose();
  }

  function addActivity() {
    if (!time) return;

    if (kind === "quest" && selectedQuest) {
      onAdd({
        id: createId("quest"),
        title: selectedQuest.title,
        time,
        type: "quest",
        completed: false,
      });
      close();
      return;
    }

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAdd({
      id: createId("activity"),
      title: trimmedTitle,
      time,
      type: "personal",
      completed: false,
    });
    close();
  }

  const canAdd = Boolean(time) && (kind === "quest" ? Boolean(selectedQuest) : Boolean(title.trim()));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="add-activity-heading" className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Deinen Plan</p>
            <h2 id="add-activity-heading" className="text-xl font-bold">Aktivität hinzufügen</h2>
          </div>
          <button type="button" onClick={close} aria-label="Dialog schließen" className="btn btn-ghost btn-sm btn-circle">✕</button>
        </div>

        <div className="join mb-4 grid w-full grid-cols-2">
          <button type="button" onClick={() => setKind("quest")} className={`join-item btn ${kind === "quest" ? "btn-primary" : "btn-outline"}`}>Quest</button>
          <button type="button" onClick={() => setKind("personal")} className={`join-item btn ${kind === "personal" ? "btn-primary" : "btn-outline"}`}>Eigene Aufgabe</button>
        </div>

        {kind === "quest" ? (
          <label className="form-control w-full">
            <span className="label-text mb-2 font-semibold">Aufgabe auswählen</span>
            <select value={questId} onChange={(event) => setQuestId(event.target.value)} className="select select-bordered w-full">
              {quests.map((quest) => (
                <option key={quest.id} value={quest.id}>{quest.title} · +{quest.rewardXp} XP</option>
              ))}
            </select>
            {selectedQuest ? <span className="mt-2 text-sm leading-5 text-base-content/65">{selectedQuest.description}</span> : null}
          </label>
        ) : (
          <label className="form-control w-full">
            <span className="label-text mb-2 font-semibold">Was möchtest du einplanen?</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="input input-bordered w-full" placeholder="z. B. Wäsche machen" maxLength={60} autoFocus />
          </label>
        )}

        <label className="form-control mt-4 w-full">
          <span className="label-text mb-2 font-semibold">Uhrzeit</span>
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="input input-bordered w-full" />
        </label>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" onClick={close} className="btn btn-outline">Abbrechen</button>
          <button type="button" onClick={addActivity} disabled={!canAdd} className="btn btn-primary">Hinzufügen</button>
        </div>
      </section>
    </div>
  );
}
