import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";

export const emailSchema = z.string().trim().pipe(z.email("Email inválido"));
export const passwordSchema = z
  .string()
  .nonempty("O campo de senha é obrigatório.")
  .min(6, "A senha deve conter pelo menos 6 caracteres.");
export const cellphoneSchema = z
  .string()
  .regex(/^\d{10,11}$/, "Telefone inválido")
  .max(15);
export const zipCodeSchema = z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido");
export const decimalSchema = z.coerce
  .number()
  .positive()
  .transform((val) => new Decimal(val));
export const stockSchema = z
  .number()
  .int("Estoque deve ser inteiro")
  .min(0, "Estoque não pode ser negativo");
export const colorRgbSchema = z
  .string()
  .regex(
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d),(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d),(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  )
  .transform((val) => {
    const [r, g, b] = val.split(",").map(Number);
    return { r, g, b };
  });
export const nameSchema = z
  .string()
  .trim()
  .min(2, "Nome deve ter pelo menos 2 caracteres")
  .max(50, "Nome muito longo");
