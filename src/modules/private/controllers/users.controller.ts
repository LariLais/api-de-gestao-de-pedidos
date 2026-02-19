import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import { ResponseHandler } from "../../../utils/responseHandler";

export class UserController {
  private userService = new UserService();
  public async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const response = await this.userService.createUser(data);
      return ResponseHandler.created(
        res,
        response,
        "Usuário criado com sucesso.",
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
