"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../../../errors/appError");
const products_repository_1 = require("../repository/products.repository");
const products_schema_1 = require("../schemas/products.schema");
class ProductService {
    constructor() {
        this.repository = new products_repository_1.ProductRepository();
    }
    async create(body) {
        const data = products_schema_1.productSchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.repository.create(data.data);
        if (!response) {
            throw new appError_1.AppError("Erro ao criar produto", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const responseData = {
            id: response.id,
            name: response.name,
            price: response.price,
            size: response.size,
            color_rgb: response.color_rgb,
            stock: response.stock,
            description: response.description ?? "",
            visible: response.visible ?? true,
            categoryId: response.category_id ?? undefined,
            brandId: response.brand_id ?? undefined,
        };
        return responseData;
    }
    async update(id, body) {
        const data = products_schema_1.productSchema.partial().safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.repository.update(id, data.data);
        if (!response) {
            throw new appError_1.AppError("Erro ao atualizar produto", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const responseData = {
            id: response.id,
            name: response.name,
            price: response.price,
            size: response.size,
            color_rgb: response.color_rgb,
            stock: response.stock,
            description: response.description ?? "",
            visible: response.visible ?? true,
            categoryId: response.category_id ?? undefined,
            brandId: response.brand_id ?? undefined,
        };
        return responseData;
    }
    async getById(id) {
        const response = await this.repository.getById(id);
        if (!response) {
            throw new appError_1.AppError("Produto não encontrado", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const responseData = {
            id: response.id,
            name: response.name,
            price: response.price,
            size: response.size,
            color_rgb: response.color_rgb,
            stock: response.stock,
            description: response.description ?? "",
            visible: response.visible ?? true,
            categoryId: response.category_id ?? undefined,
            brandId: response.brand_id ?? undefined,
        };
        return responseData;
    }
    async getAll() {
        const response = await this.repository.getAll();
        if (!response) {
            throw new appError_1.AppError("Nenhum produto encontrado", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const responseData = response.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            size: product.size,
            color_rgb: product.color_rgb,
            stock: product.stock,
            description: product.description ?? "",
            visible: product.visible ?? true,
            categoryId: product.category_id ?? undefined,
            brandId: product.category_id ?? undefined,
        }));
        return responseData;
    }
    async delete(id) {
        const response = await this.repository.delete(id);
        if (!response) {
            throw new appError_1.AppError("Erro ao deletar produto", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return { message: "Produto deletado com sucesso" };
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=products.service.js.map