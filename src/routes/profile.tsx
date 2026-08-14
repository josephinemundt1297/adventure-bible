import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/react";
import { createFileRoute } from "@tanstack/react-router";
import { CharacterView } from "../features/profile/components/characterView";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <>
      <SignedOut>
        <ProfileSignedOut />
      </SignedOut>
      <SignedIn>
        <ProfileSignedIn />
      </SignedIn>
    </>
  );
}

function ProfileSignedOut() {
  return (
    <section className="mx-auto flex max-w-md flex-col gap-6" aria-labelledby="profile-heading">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Neues Abenteuer
        </p>
        <h1 id="profile-heading" className="text-2xl font-bold tracking-tight">
          Dein Abenteuer wartet
        </h1>
        <p className="text-sm leading-6 text-base-content/70">
          Melde dich an oder erstelle dein Konto, damit dein Charakter und dein Fortschritt
          erhalten bleiben.
        </p>
      </header>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-3">
          <SignInButton mode="modal">
            <button type="button" className="btn btn-primary min-h-12 w-full">
              Anmelden
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button type="button" className="btn btn-outline min-h-12 w-full">
              Konto erstellen
            </button>
          </SignUpButton>
        </div>
      </div>
    </section>
  );
}

function ProfileSignedIn() {
  const { user } = useUser();
  const name = user.fullName ?? user.firstName ?? user.username ?? "Abenteurer";

  return (
    <section className="mx-auto flex max-w-md flex-col gap-5" aria-labelledby="account-heading">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            Dein Konto
          </p>
          <h1 id="account-heading" className="text-2xl font-bold tracking-tight">{name}</h1>
          <p className="text-sm leading-5 text-base-content/70">
            Dein Clerk-Konto ist mit deinem Adventure-Bible-Profil verbunden.
          </p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      <CharacterView name={name} />
    </section>
  );
}
