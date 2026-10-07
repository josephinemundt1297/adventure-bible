import { z } from "zod";

function parseActivityDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toISOString().slice(0, 10) === date ? parsedDate : null;
}

const activityDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((date) => parseActivityDate(date) !== null)
  .transform((date) => parseActivityDate(date) as Date);

const activityTimeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

export const planActivityTypeSchema = z.enum(["QUEST", "PERSONAL"]);

export const planActivityInputSchema = z
  .object({
    title: z.string().trim().min(1).max(120),
    activityDate: activityDateSchema,
    activityTime: activityTimeSchema,
    type: planActivityTypeSchema,
    completed: z.boolean().optional(),
    sortOrder: z.number().int().min(0).max(1000).optional(),
    questId: z.string().trim().min(1).optional(),
  })
  .strict();

export const planActivityUpdateInputSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    activityDate: activityDateSchema.optional(),
    activityTime: activityTimeSchema.optional(),
    type: planActivityTypeSchema.optional(),
    completed: z.boolean().optional(),
    sortOrder: z.number().int().min(0).max(1000).optional(),
    questId: z.string().trim().min(1).nullable().optional(),
  })
  .strict()
  .refine((input) => Object.keys(input).length > 0, {
    message: "Mindestens ein Feld ist erforderlich.",
  });

export type PlanActivityInput = z.infer<typeof planActivityInputSchema>;
export type PlanActivityUpdateInput = z.infer<
  typeof planActivityUpdateInputSchema
>;
