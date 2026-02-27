"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../../../errors/appError");
const users_repository_1 = require("../repository/users.repository");
const users_schema_1 = require("../schemas/users.schema");
class UserService {
    constructor() {
        this.userRepository = new users_repository_1.UserRepository();
    }
    async createUser(body) {
        const data = users_schema_1.userCreateSchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.userRepository.createUser(data.data);
        if (!response) {
            throw new appError_1.AppError("Erro ao criar usuário", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return await this.formatResponse(response);
    }
    async updateUser(id, body) {
        const data = users_schema_1.userUpdateSchema.safeParse(body);
        if (!data.success) {
            throw new Error(JSON.stringify(data.error.issues.map((issue) => issue.message).join(", ")));
        }
        const response = await this.userRepository.updateUser(id, body);
        if (!response) {
            throw new appError_1.AppError("Usuáerio não encontrado", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return await this.formatResponse(response);
    }
    async getUserById(id) {
        const response = await this.userRepository.getUserById(id);
        if (!response) {
            throw new appError_1.AppError("Usuário não encontrado", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const responseReturn = {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role,
        };
        return await this.formatResponse(response);
    }
    async getUsersByRole(role) {
        const response = await this.userRepository.getUsersByRole(role);
        if (!response || response.length === 0) {
            throw new appError_1.AppError("Nenhum usuário encontrado", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return await this.formatResponse(response);
    }
    async formatResponse(data) {
        const dataFormatted = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            cellphone: data.cellphone,
            street: data.street,
            neighborhood: data.neighborhood,
            number: data.number,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
        };
        return dataFormatted;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map