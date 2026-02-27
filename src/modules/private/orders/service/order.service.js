"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../../../errors/appError");
const orders_repository_1 = require("../repository/orders.repository");
const orders_schema_1 = require("../schemas/orders.schema");
class OrderService {
    constructor() {
        this.orderRepository = new orders_repository_1.OrdersRepository();
    }
    async create(body) {
        const data = orders_schema_1.orderCreateSchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.orderRepository.create(data.data);
        if (!response) {
            throw new appError_1.AppError("Erro ao criar pedido", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const orderResponse = {
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
    async updateOrderStatus(id, body) {
        const data = orders_schema_1.orderCreateSchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.orderRepository.updateOrderStatus(id, data.data);
        if (!response) {
            throw new appError_1.AppError("Erro ao atualizar status do pedido", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const orderResponse = {
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
    async getAll() {
        const response = await this.orderRepository.getAll();
        if (!response || response.length === 0) {
            throw new appError_1.AppError("Não há pedidos cadastrados", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const ordersResponse = response.map((order) => ({
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
    async getById(id) {
        const response = await this.orderRepository.getById(id);
        if (!response) {
            throw new appError_1.AppError("Pedido não encontrado", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const orderResponse = {
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
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map