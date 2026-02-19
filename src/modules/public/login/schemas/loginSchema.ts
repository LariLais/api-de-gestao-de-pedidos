import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("O campo de email é obrigatório.")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "O campo de email deve ser um endereço de email válido.",
    ),
  password: z
    .string()
    .nonempty("O campo de senha é obrigatório.")
    .min(6, "A senha deve conter pelo menos 6 caracteres."),
});
