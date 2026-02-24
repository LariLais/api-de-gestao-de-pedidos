import { z } from "zod";
import { partial } from "zod/v4/core/util.cjs";

export const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  size: z
    .string()
    .nonempty("O campo 'size' tem tamanho máximo de 5 caracteres.")
    .max(5),
  color_rgb: z.string().max(13),
  stock: z.number(),
  description: z.string().optional(),
  visible: z.boolean().optional(),
  categoryId: z.number().optional(),
  brandId: z.number().optional(),
});

export const productUpdateSchema = z
  .object({
    name: z.string(),
    price: z.string(),
    size: z
      .string()
      .nonempty("O campo 'size' tem tamanho máximo de 5 caracteres.")
      .max(5),
    color_rgb: z.string().max(13),
    stock: z.number(),
    description: z.string().optional(),
    visible: z.boolean().optional(),
    categoryId: z.number().optional(),
    brandId: z.number().optional(),
  })
  .partial();
