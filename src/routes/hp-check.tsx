import { createFileRoute } from "@tanstack/react-router";
import { HpCheck } from "../features/hpCheck/components/hpCheck";

export const Route = createFileRoute("/hp-check")({
  component: HpCheckPage,
});

function HpCheckPage() {
  return <HpCheck />;
}
