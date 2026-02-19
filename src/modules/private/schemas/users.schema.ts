import { z } from "zod";
import { $Enums } from "../../../generated/prisma/client";

export const userCreateSchema = z.object({
  name: z.string(),
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
    role: z.enum(['CUSTOMER', 'ADMIN', 'STORE']),
    cellphone: z.string().max(15),
    street: z.string(),
    neighborhood: z.string(),
    number: z.string(),
    city: z.string(),
    state: z.enum($Enums.users_state),
    zipcode: z.string()
});
