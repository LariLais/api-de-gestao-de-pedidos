import { Request, Response } from "express";
import { ResponseHandler } from "../../../../utils/responseHandler";
import { OrderService } from "../service/order.service";

export class OrderController {
  private readonly service = new OrderService();

  public async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return ResponseHandler.created(
        res,
        response,
        "Pedido criado com sucesso.",
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

  public async updateOrderStatus(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const response = await this.service.updateOrderStatus(id, data);
      return ResponseHandler.success(
        res,
        response,
        "Status do pedido atualizado com sucesso.",
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
      return ResponseHandler.success(res, response, "Lista de pedidos.");
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
      return ResponseHandler.success(res, response, `Pedido de ID '${id}'`);
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
