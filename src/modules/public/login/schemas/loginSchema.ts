import { z } from "zod";
import { emailSchema, passwordSchema } from "../../../../schemas/schemas";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
