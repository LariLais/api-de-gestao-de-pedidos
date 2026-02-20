import { Request, Response } from "express";
import { ResponseHandler } from "../../../../utils/responseHandler";
import { LoginService } from "../service/login.service";

export class LoginController {
  private loginService: LoginService = new LoginService();

  public async login(req: Request, res: Response) {
    try {
      console.log(req.body)
      const login = await this.loginService.login(req.body, res);
      return ResponseHandler.success(
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
