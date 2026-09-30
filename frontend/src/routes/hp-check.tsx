import { createFileRoute } from "@tanstack/react-router";
import { HpCheck } from "../features/hpCheck/components/hpCheck";

export const Route = createFileRoute("/hp-check")({
  component: HpCheckPage,
});

function HpCheckPage() {
  return (
    <div className="hp-check-page flex min-h-full items-start justify-center">
      <div className="w-full">
        <HpCheck />
      </div>
    </div>
  );
}
