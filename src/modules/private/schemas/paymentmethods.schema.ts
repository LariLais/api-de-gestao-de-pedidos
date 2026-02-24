import { z } from "zod";

export const paymentMethodSchema = z.object({
  name: z.string(),
  active: z.boolean().optional(),
});

export const paymentMethodUpdateSchema = z
  .object({
    name: z.string(),
    active: z.boolean().optional(),
  })
  .partial();
