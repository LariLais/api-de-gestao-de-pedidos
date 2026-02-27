import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";
import { decimalSchema, stockSchema } from "../../../../schemas/schemas";

export const productSchema = z.object({
  name: z.string(),
  price: decimalSchema,
  size: z
    .string()
    .min(1, "Size é obrigatório")
    .max(5, "Size deve ter no máximo 5 caracteres"),
  color_rgb: z.string().max(13),
  stock: stockSchema,
  description: z.string().optional(),
  visible: z.boolean().default(true).optional(),
  categoryId: z.number().optional(),
  brandId: z.number().optional(),
});

export const productUpdateSchema = z
  .object({
    name: z.string(),
    price: decimalSchema,
    size: z
      .string()
      .nonempty("O campo 'size' tem tamanho máximo de 5 caracteres.")
      .max(5),
    color_rgb: z.string().max(13),
    stock: stockSchema,
    description: z.string().optional(),
    visible: z.boolean().default(true).optional(),
    categoryId: z.number().optional(),
    brandId: z.number().optional(),
  })
  .partial();
