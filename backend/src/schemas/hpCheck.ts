import { z } from "zod";

const hpAnswerSchema = z.number().min(1).max(5);

export const hpCheckInputSchema = z
  .object({
    type: z.enum(["FULL", "MINI"]),
    body: hpAnswerSchema,
    energy: hpAnswerSchema,
    focus: hpAnswerSchema,
    mood: hpAnswerSchema,
    muscle: hpAnswerSchema,
    nutrition: hpAnswerSchema,
    recovery: hpAnswerSchema,
  })
  .strict();

export type HpCheckInput = z.infer<typeof hpCheckInputSchema>;
