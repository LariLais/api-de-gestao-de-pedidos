import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../../errors/appError";
import { ILogin } from "../interfaces/ILogin";
import { LoginRepository } from "../repository/login.repository";
import { loginSchema } from "../schemas/loginSchema";
import jwt, { SignOptions } from "jsonwebtoken";
import { Response } from "express";
import ms from "ms";

const loginRepository = new LoginRepository();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const signOptions: SignOptions = {
  expiresIn: (process.env.TOKEN_EXPIRES_IN ?? "1h") as ms.StringValue,
};

export class LoginService {
  public async login(login: ILogin, res: Response) {
    const loginData = loginSchema.safeParse(login);

    if (!loginData.success) {
      throw new Error(
        JSON.stringify(
          loginData.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const { email, password } = loginData.data;

    const user = await loginRepository.getUser(email);

    if (!user) {
      throw new AppError("Credenciais inválidas.", StatusCodes.UNAUTHORIZED);
    }

    const equalPassword = await loginRepository.verifyHashedPassword(
      user.email,
      password,
    );

    if (!equalPassword) {
      throw new AppError("Credenciais inválidas.", StatusCodes.UNAUTHORIZED);
    }

    await this.generateToken(user.email, res);

    return user.role;
  }
  private async generateToken(userId: string, res: Response) {
    const user = await loginRepository.getUser(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.", StatusCodes.NOT_FOUND);
    }

    if (!TOKEN_SECRET) {
      throw new AppError(
        "TOKEN_SECRET não definido",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const payload = {
      userId: userId,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: signOptions.expiresIn || "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:
        typeof signOptions.expiresIn === "number"
          ? signOptions.expiresIn * 1000
          : 3600000,
      domain:
        process.env.NODE_ENV === "production" ? "yourdomain.com" : "localhost",
      expires: new Date(
        Date.now() +
          (typeof signOptions.expiresIn === "number"
            ? signOptions.expiresIn * 1000
            : 3600000),
      ),
    });
  }
}
