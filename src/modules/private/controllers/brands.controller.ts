import { Request, Response } from "express";
import { ResponseHandler } from "../../../utils/responseHandler";
import { BrandService } from "../services/brands.service";

export class BrandControlller {
  private readonly service = new BrandService();

  public async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return ResponseHandler.created(
        res,
        response,
        "Marca criada com sucesso.",
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
        "Marca atualizado com sucesso.",
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
      return ResponseHandler.success(res, response, "Lista de marcas.");
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
      return ResponseHandler.success(res, response, `Marca de ID '${id}'`);
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
        "Marca deletada com sucesso.",
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
