import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().nonempty("O campo de name é obrigatório."),
  visible: z.boolean(),
});

export const branchUpdateSchema = z
  .object({
    name: z.string(),
    visible: z.boolean(),
  })
  .partial();
