"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../../../errors/appError");
const categories_repository_1 = require("../repository/categories.repository");
const categories_schema_1 = require("../schemas/categories.schema");
class CategoryService {
    constructor() {
        this.categoryRepository = new categories_repository_1.CategoriesRepository();
    }
    async create(body) {
        const data = categories_schema_1.categorySchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.categoryRepository.createCategory(data.data);
        if (!response) {
            throw new appError_1.AppError("Erro ao criar usuário", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return response;
    }
    async update(id, body) {
        const data = categories_schema_1.categorySchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.categoryRepository.updateCategory(id, data.data);
        if (!response) {
            throw new appError_1.AppError("Categoria não encontrada.", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return response;
    }
    async getById(id) {
        const response = await this.categoryRepository.getCategoryById(id);
        if (!response) {
            throw new appError_1.AppError("Categoria não encontrada.", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return response;
    }
    async getAll() {
        const response = await this.categoryRepository.getAllCategories();
        if (!response || response.length === 0) {
            throw new appError_1.AppError("Não há categorias cadastradas", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return response;
    }
    async delete(id) {
        const response = await this.categoryRepository.deleteCategory(id);
        if (!response) {
            throw new appError_1.AppError("Categoria não encontrada.", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return {
            message: "Categoria deletada com sucesso",
        };
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=categories.service.js.map