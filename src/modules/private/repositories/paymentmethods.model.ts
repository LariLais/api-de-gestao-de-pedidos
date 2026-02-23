import { prisma } from "../../../../prisma/config/prisma";
import { IPaymentMethodsInput } from "../interfaces/IPaymentMethods";

export class PaymentMethodsRepository {
  public async create(data: IPaymentMethodsInput) {
    const payment = await prisma.payment_methods.create({
      data: {
        name: data.name,
        active: data.active ?? true,
      },
    });
    return payment;
  }
  public async update(id: number, data: IPaymentMethodsInput) {
    const payment = await prisma.payment_methods.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        ...(data.active !== undefined && { active: data.active }),
      },
    });
    return payment;
  }
  public async getById(id: number) {
    const payment = await prisma.payment_methods.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
    return payment;
  }
  public async getAll() {
    const payments = await prisma.payment_methods.findMany({
      where: {
        deleted_at: null,
      },
    });
    return payments;
  }
  public async delete(id: number) {
    const payment = await prisma.payment_methods.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
    return payment;
  }
}
