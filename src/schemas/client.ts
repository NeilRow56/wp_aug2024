import { z } from "zod";

const ClientSchema = z.object({
  id: z.string(),
  name: z.string().min(4, {
    message: "Client name must be at least 4 characters",
  }),
  workSuspended: z.boolean().optional(),
  category: z.enum([
    "limited_company",
    "partnership",
    "sole_trader",
    "charity",
    "other",
  ]),
  status: z.enum(["awaiting_ml_checks", "active", "archived"]),
});

export const CreateClientSchema = ClientSchema.omit({ id: true });

export type CreateClientSchemaType = z.infer<typeof CreateClientSchema>;
