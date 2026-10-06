import { Show, SignInButton, SignUpButton, useAuth, useUser } from "@clerk/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProfileCharacter } from "../features/profile/components/profileCharacter";
import { saveBackendProfile } from "../lib/backendProfile";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  return (
    <>
      <Show when="signed-out">
        <ProfileSignedOut />
      </Show>
      <Show when="signed-in">
        <ProfileSignedIn />
      </Show>
    </>
  );
}

function ProfileSignedOut() {
  return (
    <section className="mx-auto flex min-h-full w-full max-w-md flex-col" aria-labelledby="profile-heading">
      <header className="mx-auto w-[86%] space-y-[2dvh] pt-[7dvh] text-center">
        <p className="app-kicker text-xs font-bold uppercase">Neues Abenteuer</p>
        <h1 id="profile-heading" className="app-heading text-3xl font-bold leading-tight tracking-tight">
          Dein Abenteuer
          <br />
          wartet
        </h1>
        <p className="mx-auto max-w-100 text-base leading-6 text-base-content/70">
          Melde dich an oder erstelle
          <br />
          dein Konto, damit dein
          <br />
          Charakter und dein Fortschritt
          <br />
          sicher bei dir bleiben.
        </p>
      </header>
      <div className="flex flex-1 items-center justify-center pb-[8dvh] pt-[5dvh]">
        <div className="adventure-card w-full rounded-3xl border px-[4vw] py-[2.5dvh]">
          <div className="mx-auto flex w-[72%] flex-col items-center gap-[1dvh]">
            <SignInButton mode="modal"><button type="button" className="btn btn-primary min-h-12 w-full rounded-2xl text-base">Anmelden</button></SignInButton>
            <SignUpButton mode="modal"><button type="button" className="btn btn-outline min-h-12 w-full rounded-2xl border-primary/30 bg-base-100 text-base-content">Konto erstellen</button></SignUpButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileSignedIn() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const name = user?.fullName ?? user?.firstName ?? user?.username ?? "Abenteurer";
  const [syncError, setSyncError] = useState(false);

  useEffect(() => {
    if (!user) return;

    void saveBackendProfile({
      displayName: name,
      characterName: name,
      getToken,
    })
      .then(() => setSyncError(false))
      .catch(() => setSyncError(true));
  }, [getToken, name, user]);

  return (
    <>
      {syncError ? (
        <div className="alert alert-warning mb-4 text-sm" role="status">
          Profil konnte gerade nicht mit dem Backend synchronisiert werden.
        </div>
      ) : null}
      <ProfileCharacter name={name} />
    </>
  );
}
