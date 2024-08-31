import { z } from "zod";

const ClientSchema = z.object({
  id: z.string(),
  name: z.string().min(4, {
    message: "Collection name must be at least 4 characters",
  }),
  category: z.enum([
    "limited_company_large",
    "limited_company_small",
    "limited_company_very_small",
    "partnership",
    "sole_trader",
    "charity",
    "other",
  ]),
  status: z.enum(["awaiting_ml_checks", "active", "archived"]),
});

export const CreateClientSchema = ClientSchema.omit({ id: true });

export type CreateClientSchemaType = z.infer<typeof CreateClientSchema>;
