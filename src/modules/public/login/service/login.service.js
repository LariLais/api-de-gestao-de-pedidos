"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../../../errors/appError");
const login_model_1 = require("../repository/login.model");
const loginSchema_1 = require("../schemas/loginSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginRepository = new login_model_1.LoginRepository();
const TOKEN_SECRET = process.env.TOKEN_SECRET ||
    "OCOeUnIijBBl08ViS3eyPPyFw5WdgqgsaNQCtpIrGKqtTN6cZzFNaDJfLXsI7n5ERB8w0jZMQrdnfggjU5qomo";
const signOptions = {
    expiresIn: (process.env.TOKEN_EXPIRES_IN ?? "1h"),
};
class LoginService {
    async login(login, res) {
        const loginData = loginSchema_1.loginSchema.safeParse(login);
        if (!loginData.success) {
            throw new Error(JSON.stringify(loginData.error.issues.map((issue) => issue.message).join(", ")));
        }
        const { email, password } = loginData.data;
        const user = await loginRepository.getUser(email);
        if (!user) {
            throw new appError_1.AppError("Credenciais inválidas.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const equalPassword = await loginRepository.verifyHashedPassword(user.email, password);
        if (!equalPassword) {
            throw new appError_1.AppError("Credenciais inválidas.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        await this.generateToken(user.email, res);
        return user.role;
    }
    async generateToken(userId, res) {
        const user = await loginRepository.getUser(userId);
        if (!user) {
            throw new appError_1.AppError("Usuário não encontrado.", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        if (!TOKEN_SECRET) {
            throw new appError_1.AppError("JWT_SECRET não definido", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const payload = {
            userId: userId,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, TOKEN_SECRET, {
            expiresIn: signOptions.expiresIn || "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: typeof signOptions.expiresIn === "number"
                ? signOptions.expiresIn * 1000
                : 3600000,
            domain: process.env.NODE_ENV === "production" ? "yourdomain.com" : "localhost",
            expires: new Date(Date.now() +
                (typeof signOptions.expiresIn === "number"
                    ? signOptions.expiresIn * 1000
                    : 3600000)),
        });
    }
}
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map