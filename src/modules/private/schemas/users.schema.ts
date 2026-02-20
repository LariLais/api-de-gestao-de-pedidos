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
  role: z.enum(["CUSTOMER", "ADMIN", "STORE"]),
  cellphone: z.string().max(15),
  street: z.string(),
  neighborhood: z.string(),
  number: z.string(),
  city: z.string(),
  state: z.enum($Enums.users_state),
  zipcode: z.string(),
});

export const userUpdateSchema = z
  .object({
    name: z.string().optional(),
    email: z
      .string()
      .nonempty("O campo de email é obrigatório.")
      .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "O campo de email deve ser um endereço de email válido.",
      )
      .optional(),
    password: z
      .string()
      .nonempty("O campo de senha é obrigatório.")
      .min(6, "A senha deve conter pelo menos 6 caracteres.")
      .optional(),
    role: z.enum(["CUSTOMER", "ADMIN", "STORE"]).optional(),
    cellphone: z.string().max(15).optional(),
    street: z.string().optional(),
    neighborhood: z.string().optional(),
    number: z.string().optional(),
    city: z.string().optional(),
    state: z.enum($Enums.users_state).optional(),
    zipcode: z.string().optional(),
  })
  .partial();
