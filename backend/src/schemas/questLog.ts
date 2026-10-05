import { z } from "zod";

export const questLogStatusSchema = z.enum([
  "STARTED",
  "COMPLETED",
  "POSTPONED",
  "SKIPPED",
]);

export const questLogInputSchema = z
  .object({
    questId: z.string().trim().min(1),
    status: questLogStatusSchema.optional(),
    note: z.string().trim().min(1).max(1000).optional(),
  })
  .strict();

export const questLogUpdateInputSchema = z
  .object({
    status: questLogStatusSchema.optional(),
    note: z.string().trim().min(1).max(1000).optional(),
  })
  .strict()
  .refine((input) => Object.keys(input).length > 0, {
    message: "Mindestens ein Feld ist erforderlich.",
  });

export type QuestLogInput = z.infer<typeof questLogInputSchema>;
export type QuestLogUpdateInput = z.infer<typeof questLogUpdateInputSchema>;
