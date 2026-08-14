import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/react";
import { createFileRoute } from "@tanstack/react-router";
import { CharacterView } from "../features/profile/components/characterView";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

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
    <section
      className="mx-auto flex min-h-full w-full max-w-md flex-col"
      aria-labelledby="profile-heading"
    >
      <header className="mx-auto w-[72%] space-y-[1dvh] pt-[1dvh] text-center">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-primary">
          Neues Abenteuer
        </p>
        <h1
          id="profile-heading"
          className="text-[clamp(1.6rem,6vw,2rem)] font-bold leading-tight tracking-tight text-primary"
        >
          Dein Abenteuer wartet
        </h1>
        <p className="text-[0.95rem] leading-6 text-base-content/70">
          Melde dich an oder erstelle dein Konto, damit dein Charakter und dein
          Fortschritt sicher bei dir bleiben.
        </p>
      </header>

      <div className="flex flex-1 items-center justify-center pb-[8dvh] pt-[3dvh]">
        <div className="w-full rounded-3xl border border-primary/20 bg-base-100 px-[4vw] py-[2.5dvh] shadow-sm">
          <div className="mx-auto flex w-[72%] flex-col items-center gap-[1dvh]">
            <SignInButton mode="modal">
              <button
                type="button"
                className="btn btn-primary min-h-12 w-full rounded-2xl text-base"
              >
                Anmelden
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                type="button"
                className="btn btn-outline min-h-12 w-full rounded-2xl border-primary/30 bg-base-100 text-base-content"
              >
                Konto erstellen
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileSignedIn() {
  const { user } = useUser();
  const name = user.fullName ?? user.firstName ?? user.username ?? "Abenteurer";

  return (
    <section
      className="mx-auto flex w-full max-w-md flex-col gap-[2.5dvh]"
      aria-labelledby="account-heading"
    >
      <header className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-[0.75dvh]">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-primary">
            Dein Konto
          </p>
          <h1
            id="account-heading"
            className="truncate text-[clamp(1.6rem,6vw,2rem)] font-bold leading-tight tracking-tight text-primary"
          >
            {name}
          </h1>
          <p className="text-sm leading-5 text-base-content/70">
            Dein Konto ist mit deinem Adventure-Bible-Profil verbunden.
          </p>
        </div>
        <div className="shrink-0 rounded-full border border-primary/15 bg-base-100 p-1 shadow-sm">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-11",
              },
            }}
          />
        </div>
      </header>

      <CharacterView name={name} />
    </section>
  );
}
