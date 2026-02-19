import { Request, Response } from "express";
import { ResponseHandler } from "../../../../utils/responseHandler";
import { LoginService } from "../service/login.service";

export class LoginController {
  private loginService: LoginService = new LoginService();

  public async login(req: Request, res: Response) {
    try {
      const role = await this.loginService.login(req.body, res);
      return res.status(200).json({ message: "Login bem-sucedido.", role });
    } catch (error) {
      return ResponseHandler.error(
        res,
        error instanceof Error ? error.message : "Erro desconhecido.",
        500,
        error,
      );
    }
  }
}
