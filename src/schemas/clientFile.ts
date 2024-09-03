import { z } from "zod";

export const ClientFileSchema = z.object({
  period: z.coerce.number().positive(),
  slug: z.string().min(1).max(100),
});
