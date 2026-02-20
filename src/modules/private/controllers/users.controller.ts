import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import { ResponseHandler } from "../../../utils/responseHandler";
import { $Enums } from "../../../generated/prisma/browser";

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

  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await this.userService.updateUser(Number(id), data);
      return ResponseHandler.success(
        res,
        response,
        "Usuário atualizado com sucesso.",
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

  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await this.userService.getUserById(Number(id));
      return ResponseHandler.success(res, response, "Usuário encontrado.");
    } catch (error) {
      return ResponseHandler.error(
        res,
        error instanceof Error ? error.message : "Erro desconhecido.",
        500,
        error,
      );
    }
  }

  public async getUsersByRole(req: Request, res: Response) {
    try {
      const { role } = req.params;
      const response = await this.userService.getUsersByRole(
        role as $Enums.users_role,
      );
      return ResponseHandler.success(
        res,
        response,
        "Usuários encontrados por função.",
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
