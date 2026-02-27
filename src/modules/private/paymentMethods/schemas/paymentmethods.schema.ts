import { z } from "zod";
import { nameSchema } from "../../../../schemas/schemas";

export const paymentMethodSchema = z.object({
  name: nameSchema,
  active: z.boolean().default(true).optional(),
});

export const paymentMethodUpdateSchema = z
  .object({
    name: nameSchema,
    active: z.boolean().default(true).optional(),
  })
  .partial();
