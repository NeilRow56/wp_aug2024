import { z } from "zod";

export const ClientFileSchema = z.object({
  period: z.string().min(4, {
    message: "Period must be at least 4 characters",
  }),
  slug: z.string().min(1).max(100),
  shortDate: z.coerce.number().multipleOf(0.1),
  periodStart: z.string(),
  periodEnd: z.string(),
});
