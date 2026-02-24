import { z } from "zod";

export const orderCreateSchema = z.object({
  userId: z.number(),
  paymentMethodId: z.number(),
  status: z.enum(["PENDING", "PAID", "SHIPPED", "CANCELED"]),
  totalAmount: z.string(),
  orderItems: z
    .object({
      productId: z.number(),
      quantity: z.number(),
      unitPrice: z.string(),
    })
    .array(),
});

export const orderUpdateStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "SHIPPED", "CANCELED"]),
});
