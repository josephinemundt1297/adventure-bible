import { createFileRoute } from "@tanstack/react-router";
import { HpCheck } from "../features/hpCheck/components/hpCheck";

export const Route = createFileRoute("/hp-check")({
  component: HpCheckPage,
});

function HpCheckPage() {
  return (
    <div className="flex min-h-full items-center justify-center py-2">
      <div className="w-full">
        <HpCheck />
      </div>
    </div>
  );
}
