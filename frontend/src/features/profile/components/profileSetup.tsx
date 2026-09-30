import type { FormEvent } from "react";
import { useState } from "react";

interface ProfileSetupProps {
  onComplete: (name: string) => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [name, setName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (trimmedName) {
      onComplete(trimmedName);
    }
  }

  return (
    <section className="mx-auto max-w-md space-y-6" aria-labelledby="profile-heading">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Neues Abenteuer</p>
        <h1 id="profile-heading" className="mt-2 text-2xl font-bold tracking-tight">
          Erstelle dein Profil
        </h1>
        <p className="mt-2 text-sm leading-6 text-base-content/70">
          Nur das, was wir für deinen ersten Abenteuerzyklus wirklich brauchen.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-5">
          <div className="form-control">
            <label className="label" htmlFor="profile-name">
              <span className="label-text font-medium">Wie sollen wir dich nennen?</span>
            </label>
            <input
              id="profile-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input input-bordered w-full"
              placeholder="Dein Name"
            />
          </div>

          <button type="submit" className="btn btn-primary min-h-12 w-full">
            Abenteuer beginnen
          </button>
        </div>
      </form>
    </section>
  );
}
