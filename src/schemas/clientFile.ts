import { z } from "zod";

export const ClientFileSchema = z.object({
  // period: z.coerce
  //   .number({
  //     message: "Period must be entered as a number",
  //   })
  //   .positive(),
  period: z.string().min(4, {
    message: "Period must be at least 4 characters",
  }),
  slug: z.string().min(1).max(100),
});
