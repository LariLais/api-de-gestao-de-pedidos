import { Request, Response } from "express";
import { ProductService } from "../services/products.service";
import { ResponseHandler } from "../../../utils/responseHandler";

export class ProductController {
  private readonly service = new ProductService();

  public async create(req: Request, res: Response) {
    try {
      const response = await this.service.create(req.body);
      return ResponseHandler.created(
        res,
        response,
        "Produto criado com sucesso.",
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
      const body = req.body;
      const response = await this.service.update(id, body);
      return ResponseHandler.success(
        res,
        response,
        "Produto atualizado com sucesso.",
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
      return ResponseHandler.success(res, response, "Lista de produtos.");
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
      return ResponseHandler.success(res, response, `Produto de ID '${id}'.`);
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
        "Produto deletado com sucesso.",
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
