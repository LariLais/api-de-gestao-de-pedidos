import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../../errors/appError";
import { IOrdersInput, IOrdersResponse, IOrdersStatus } from "../interface/IOrders";
import { OrdersRepository } from "../repository/orders.repository";
import { orderCreateSchema } from "../schemas/orders.schema";

export class OrderService {
  private orderRepository = new OrdersRepository();

  public async create(body: IOrdersInput): Promise<IOrdersResponse> {
    const data = orderCreateSchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.orderRepository.create(data.data);

    if (!response) {
      throw new AppError(
        "Erro ao criar pedido",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const orderResponse: IOrdersResponse = {
      id: response.id,
      userId: response.user_id,
      paymentMethodId: response.payment_method_id,
      status: response.status ?? "PENDING",
      totalAmount: response.total_amount,
      orderItems: response.order_items.map((item) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        quantity: item.quantity,
        unitPrice: item.unit_price,
      })),
    };
    return orderResponse;
  }

  public async updateOrderStatus(
    id: number,
    body: Partial<IOrdersStatus>,
  ): Promise<IOrdersResponse> {
    const data = orderCreateSchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.orderRepository.updateOrderStatus(
      id,
      data.data,
    );

    if (!response) {
      throw new AppError(
        "Erro ao atualizar status do pedido",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const orderResponse: IOrdersResponse = {
      id: response.id,
      userId: response.user_id,
      paymentMethodId: response.payment_method_id,
      status: response.status ?? "PENDING",
      totalAmount: response.total_amount,
      orderItems: response.order_items.map((item) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        quantity: item.quantity,
        unitPrice: item.unit_price,
      })),
    };
    return orderResponse;
  }

  public async getAll(): Promise<IOrdersResponse[]> {
    const response = await this.orderRepository.getAll();

    if (!response || response.length === 0) {
      throw new AppError("Não há pedidos cadastrados", StatusCodes.NOT_FOUND);
    }

    const ordersResponse: IOrdersResponse[] = response.map((order) => ({
      id: order.id,
      userId: order.user_id,
      paymentMethodId: order.payment_method_id,
      status: order.status ?? "PENDING",
      totalAmount: order.total_amount,
      orderItems: order.order_items.map((item) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        quantity: item.quantity,
        unitPrice: item.unit_price,
      })),
    }));
    return ordersResponse;
  }

  public async getById(id: number): Promise<IOrdersResponse> {
    const response = await this.orderRepository.getById(id);

    if (!response) {
      throw new AppError("Pedido não encontrado", StatusCodes.NOT_FOUND);
    }

    const orderResponse: IOrdersResponse = {
      id: response.id,
      userId: response.user_id,
      paymentMethodId: response.payment_method_id,
      status: response.status ?? "PENDING",
      totalAmount: response.total_amount,
      orderItems: response.order_items.map((item) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        quantity: item.quantity,
        unitPrice: item.unit_price,
      })),
    };

    return orderResponse;
  }
}
