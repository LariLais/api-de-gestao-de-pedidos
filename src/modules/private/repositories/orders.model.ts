import { prisma } from "../../../../prisma/config/prisma";
import {
  IOrdersInput,
  IOrdersItemsInput,
  IOrdersStatus,
} from "../interfaces/IOrders";

export class OrdersRepository {
  public async create(data: IOrdersInput) {
    const orders = await prisma.orders.create({
      data: {
        user_id: data.userId,
        ...(data.status !== undefined && {
          status: data.status,
        }),
        payment_method_id: data.paymentMethodId,
        total_amount: data.totalAmount,
      },
      include: { order_items: true },
    });

    data.orderItems.map(async (item) => {
      await this.createOrderItems(orders.id, item);
    });
    return orders;
  }
  public async updateOrderStatus(id: number, data: IOrdersStatus) {
    const order = await prisma.orders.update({
      where: {
        id,
      },
      data: {
        status: data.status,
      },
    });
    return order;
  }
  public async getById(id: number) {
    const order = await prisma.orders.findFirst({
      where: { id },
      include: {
        order_items: true,
      },
    });
  }
  public async getAll() {
    const orders = await prisma.orders.findMany({
      include: { order_items: true },
    });
    return orders;
  }

  private async createOrderItems(orderId: number, data: IOrdersItemsInput) {
    const ordersItems = await prisma.order_items.create({
      data: {
        order_id: orderId,
        product_id: data.productId,
        quantity: data.quantity,
        unit_price: data.unitPrice,
      },
    });
    return ordersItems;
  }
}
