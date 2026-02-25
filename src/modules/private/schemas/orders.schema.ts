import { z } from "zod";
import { Decimal } from "../../../generated/prisma/internal/prismaNamespaceBrowser";

export const orderCreateSchema = z.object({
  userId: z.number(),
  paymentMethodId: z.number(),
  status: z.enum(["PENDING", "PAID", "SHIPPED", "CANCELED"]),
  totalAmount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .transform((val) => new Decimal(val)),
  orderItems: z
    .object({
      productId: z.number(),
      quantity: z.number(),
      unitPrice: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/)
        .transform((val) => new Decimal(val)),
    })
    .array(),
});

export const orderUpdateStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "SHIPPED", "CANCELED"]),
});
