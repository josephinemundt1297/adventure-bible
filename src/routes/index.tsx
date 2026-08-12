import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center px-6 py-8">
      <p className="text-sm font-medium uppercase tracking-wide text-base-content/60">
        Dein Abenteuer beginnt hier
      </p>
      <h1 className="mt-2 text-4xl font-bold">Adventure Bible</h1>
      <p className="mt-4 text-base-content/70">
        Ein ruhiger Ort für deine Quests, deinen Fortschritt und deine Pausen.
      </p>
    </section>
  );
}
