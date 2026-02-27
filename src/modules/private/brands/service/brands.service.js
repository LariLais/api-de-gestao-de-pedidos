"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../../../errors/appError");
const brands_repository_1 = require("../repository/brands.repository");
const brands_schema_1 = require("../schemas/brands.schema");
class BrandService {
    constructor() {
        this.brandRepository = new brands_repository_1.BrandsRepository();
    }
    async create(body) {
        const data = brands_schema_1.brandSchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.brandRepository.create(data.data);
        const brandResponse = {
            id: response.id,
            name: response.name,
            visible: response.visible,
        };
        return brandResponse;
    }
    async update(id, body) {
        const data = brands_schema_1.brandSchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.brandRepository.update(id, data.data);
        const brandResponse = {
            id: response.id,
            name: response.name,
            visible: response.visible,
        };
        return brandResponse;
    }
    async getAll() {
        const response = await this.brandRepository.getAll();
        if (!response || response.length === 0) {
            throw new appError_1.AppError("Não há marcas cadastradas", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const brandsResponse = response.map((brand) => ({
            id: brand.id,
            name: brand.name,
            visible: brand.visible,
        }));
        return brandsResponse;
    }
    async getById(id) {
        const response = await this.brandRepository.getById(id);
        if (!response) {
            throw new appError_1.AppError("Marca não encontrada", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const brandResponse = {
            id: response.id,
            name: response.name,
            visible: response.visible,
        };
        return brandResponse;
    }
    async delete(id) {
        const response = await this.brandRepository.delete(id);
        if (!response) {
            throw new appError_1.AppError("Marca não encontrada", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return {
            message: "Marca deletada com sucesso",
        };
    }
}
exports.BrandService = BrandService;
//# sourceMappingURL=brands.service.js.map