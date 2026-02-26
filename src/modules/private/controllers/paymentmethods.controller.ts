import { Request, Response } from "express";
import { PaymentMethodsService } from "../services/paymentmethods.service";
import { ResponseHandler } from "../../../utils/responseHandler";

export class PaymentMethodController {
  private readonly service = new PaymentMethodsService();

  public async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return ResponseHandler.created(
        res,
        response,
        "Método de pagamento criado com sucesso.",
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

  public async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const response = await this.service.update(id, data);
      return ResponseHandler.success(
        res,
        response,
        "Método de pagamento atualizado com sucesso.",
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

  public async getAll(req: Request, res: Response) {
    try {
      const response = await this.service.getAll();
      return ResponseHandler.success(
        res,
        response,
        "Lista de métodos de pagamento.",
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

  public async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const response = await this.service.getById(id);
      return ResponseHandler.success(
        res,
        response,
        `Método de pagamento de ID '${id}'`,
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

  public async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const response = await this.service.delete(id);
      return ResponseHandler.success(
        res,
        response,
        "Método de pagamento deletado com sucesso.",
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
