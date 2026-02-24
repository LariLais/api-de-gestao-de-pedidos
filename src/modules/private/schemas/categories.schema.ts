import { z } from "zod";

export const categorySchema = z.object({
  name: z.string("O campo name é obrigatório."),
});