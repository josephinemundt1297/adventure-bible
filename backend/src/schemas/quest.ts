import { z } from "zod";

export const questInputSchema = z
  .object({
    title: z.string().trim().min(1).max(120),
    description: z.string().trim().min(1).max(1000).optional(),
    type: z.enum(["MAIN", "SIDE", "DAILY", "RECOVERY"]),
    difficulty: z.number().int().min(1).max(5),
    estimatedMinutes: z.number().int().min(1).max(1440).optional(),
    xpReward: z.number().int().min(0).max(10000).optional(),
    questPointReward: z.number().int().min(0).max(1000).optional(),
  })
  .strict();

export const questUpdateInputSchema = questInputSchema.partial().refine(
  (input) => Object.keys(input).length > 0,
  {
    message: "Mindestens ein Feld ist erforderlich.",
  },
);

export type QuestInput = z.infer<typeof questInputSchema>;
export type QuestUpdateInput = z.infer<typeof questUpdateInputSchema>;
