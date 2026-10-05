import { z } from "zod";

function parseEntryDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toISOString().slice(0, 10) === date ? parsedDate : null;
}

const entryDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((date) => parseEntryDate(date) !== null)
  .transform((date) => parseEntryDate(date) as Date);

const entryTimeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

export const journalEntryTypeSchema = z.enum(["EVENT", "REFLECTION"]);

export const journalEntryInputSchema = z
  .object({
    entryDate: entryDateSchema.optional(),
    entryTime: entryTimeSchema.optional(),
    type: journalEntryTypeSchema,
    title: z.string().trim().min(1).max(160),
    content: z.string().trim().min(1).max(5000).optional(),
    questLogId: z.string().trim().min(1).optional(),
    hpCheckId: z.string().trim().min(1).optional(),
  })
  .strict();

export const journalEntryUpdateInputSchema = z
  .object({
    entryDate: entryDateSchema.nullable().optional(),
    entryTime: entryTimeSchema.nullable().optional(),
    type: journalEntryTypeSchema.optional(),
    title: z.string().trim().min(1).max(160).optional(),
    content: z.string().trim().min(1).max(5000).nullable().optional(),
    questLogId: z.string().trim().min(1).nullable().optional(),
    hpCheckId: z.string().trim().min(1).nullable().optional(),
  })
  .strict()
  .refine((input) => Object.keys(input).length > 0, {
    message: "Mindestens ein Feld ist erforderlich.",
  });

export type JournalEntryInput = z.infer<typeof journalEntryInputSchema>;
export type JournalEntryUpdateInput = z.infer<
  typeof journalEntryUpdateInputSchema
>;
