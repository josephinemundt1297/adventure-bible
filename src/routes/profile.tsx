import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CharacterView } from "../features/profile/components/characterView";
import { ProfileSetup } from "../features/profile/components/profileSetup";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const [name, setName] = useState<string | null>(null);

  return name ? (
    <CharacterView name={name} />
  ) : (
    <ProfileSetup onComplete={setName} />
  );
}
