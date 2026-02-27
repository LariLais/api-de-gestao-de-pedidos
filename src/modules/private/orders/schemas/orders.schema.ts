import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";
import { decimalSchema } from "../../../../schemas/schemas";

export const orderCreateSchema = z.object({
  userId: z.number(),
  paymentMethodId: z.number(),
  status: z.enum(["PENDING", "PAID", "SHIPPED", "CANCELED"]),
  totalAmount: decimalSchema,
  orderItems: z
    .object({
      productId: z.number().positive().int(),
      quantity: z.number().int().min(1),
      unitPrice: decimalSchema,
    })
    .array(),
});

export const orderUpdateStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "SHIPPED", "CANCELED"]),
});
