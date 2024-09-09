import { z } from "zod";

export const DateFormDataSchema = z.object({
  period: z.string().min(6, "Period is required"),
  slug: z.string().min(6, "Slug is required"),
  dateOfBirth: z.date().optional(),
});
