import { z } from "zod";

export const profileInputSchema = z
  .object({
    displayName: z.string().trim().min(1).max(80),
    characterName: z.string().trim().min(1).max(80),
  })
  .strict();

export type ProfileInput = z.infer<typeof profileInputSchema>;
