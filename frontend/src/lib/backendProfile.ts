import { apiRequest } from "./apiClient";

export interface BackendProfile {
  id: string;
  authUserId: string;
  displayName: string;
  characterName: string;
  level: number;
  xp: number;
  questPoints: number;
  createdAt: string;
  updatedAt: string;
}

export async function saveBackendProfile(input: {
  authUserId: string;
  characterName: string;
  displayName: string;
}) {
  return apiRequest<{ data: BackendProfile }>("/api/profile", {
    authUserId: input.authUserId,
    method: "PUT",
    body: {
      displayName: input.displayName,
      characterName: input.characterName,
    },
  });
}
