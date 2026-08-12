import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute()({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <h1>Adventure Bible</h1>
      <p>Home</p>
    </main>
  );
}
