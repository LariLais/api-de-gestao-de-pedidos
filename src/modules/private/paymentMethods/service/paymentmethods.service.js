"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../../../errors/appError");
const paymentmethods_repository_1 = require("../repository/paymentmethods.repository");
const paymentmethods_schema_1 = require("../schemas/paymentmethods.schema");
class PaymentMethodsService {
    constructor() {
        this.repository = new paymentmethods_repository_1.PaymentMethodsRepository();
    }
    async create(body) {
        const data = paymentmethods_schema_1.paymentMethodSchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.repository.create(body);
        if (!response) {
            throw new appError_1.AppError("Erro ao criar método de pagamento", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const responseData = {
            id: response.id,
            name: response.name,
            active: response.active ?? true,
        };
        return responseData;
    }
    async update(id, body) {
        const data = paymentmethods_schema_1.paymentMethodSchema.partial().safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.repository.update(id, body);
        if (!response) {
            throw new appError_1.AppError("Erro ao atualizar método de pagamento", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const responseData = {
            id: response.id,
            name: response.name,
            active: response.active ?? true,
        };
        return responseData;
    }
    async getById(id) {
        const response = await this.repository.getById(id);
        if (!response) {
            throw new appError_1.AppError("Método de pagamento não encontrado", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const responseData = {
            id: response.id,
            name: response.name,
            active: response.active ?? true,
        };
        return responseData;
    }
    async getAll() {
        const response = await this.repository.getAll();
        if (!response) {
            throw new appError_1.AppError("Nenhum método de pagamento encontrado", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const responseData = response.map((payment) => ({
            id: payment.id,
            name: payment.name,
            active: payment.active ?? true,
        }));
        return responseData;
    }
    async delete(id) {
        const response = await this.repository.delete(id);
        if (!response) {
            throw new appError_1.AppError("Erro ao deletar método de pagamento", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return { message: "Método de pagamento deletado com sucesso" };
    }
}
exports.PaymentMethodsService = PaymentMethodsService;
//# sourceMappingURL=paymentmethods.service.js.map