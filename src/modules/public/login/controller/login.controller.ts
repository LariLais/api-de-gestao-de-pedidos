import { Request, Response } from "express";
import { ResponseHandler } from "../../../../utils/responseHandler";
import { LoginService } from "../service/login.service";

export class LoginController {
  private loginService: LoginService = new LoginService();

  public async login(req: Request, res: Response) {
    try {
      const login = await this.loginService.login(req.body, res);
      return ResponseHandler.sucess(
        res,
        login,
        "Usuário autenticado com sucesso.",
      );
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
