import { createFileRoute } from "@tanstack/react-router";
import { MiniHpCheck } from "../features/hpCheck/components/miniHpCheck";

export const Route = createFileRoute("/mini-hp-check")({
  component: MiniHpCheckPage,
});

function MiniHpCheckPage() {
  return <MiniHpCheck />;
}
