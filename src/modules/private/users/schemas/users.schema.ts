import { z } from "zod";
import { $Enums } from "../../../../generated/prisma/client";
import {
  cellphoneSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
  zipCodeSchema,
} from "../../../../schemas/schemas";

export const userCreateSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: z.enum(["CUSTOMER", "ADMIN", "STORE"]),
  cellphone: cellphoneSchema,
  street: z.string(),
  neighborhood: z.string(),
  number: z.string(),
  city: z.string(),
  state: z.enum($Enums.users_state),
  zipcode: zipCodeSchema,
});

export const userUpdateSchema = z
  .object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
    role: z.enum(["CUSTOMER", "ADMIN", "STORE"]).optional(),
    cellphone: cellphoneSchema.optional(),
    street: z.string().optional(),
    neighborhood: z.string().optional(),
    number: z.string().optional(),
    city: z.string().optional(),
    state: z.enum($Enums.users_state).optional(),
    zipcode: zipCodeSchema.optional(),
  })
  .partial();
