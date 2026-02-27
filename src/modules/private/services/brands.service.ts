import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../errors/appError";
import { IBrandInput, IBrandResponse } from "../interfaces/IBrands";
import { BrandsRepository } from "../repositories/brands.repository";
import { brandSchema } from "../schemas/brands.schema";

export class BrandService {
  private readonly brandRepository = new BrandsRepository();

  public async create(body: IBrandInput): Promise<IBrandResponse> {
    const data = brandSchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.brandRepository.create(data.data);

    const brandResponse = {
      id: response.id,
      name: response.name,
      visible: response.visible,
    };

    return brandResponse;
  }

  public async update(id: number, body: IBrandInput): Promise<IBrandResponse> {
    const data = brandSchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.brandRepository.update(id, data.data);

    const brandResponse = {
      id: response.id,
      name: response.name,
      visible: response.visible,
    };
    return brandResponse;
  }

  public async getAll(): Promise<IBrandResponse[]> {
    const response = await this.brandRepository.getAll();

    if (!response || response.length === 0) {
      throw new AppError("Não há marcas cadastradas", StatusCodes.NOT_FOUND);
    }

    const brandsResponse = response.map((brand) => ({
      id: brand.id,
      name: brand.name,
      visible: brand.visible,
    }));

    return brandsResponse;
  }

  public async getById(id: number): Promise<IBrandResponse> {
    const response = await this.brandRepository.getById(id);

    if (!response) {
      throw new AppError("Marca não encontrada", StatusCodes.NOT_FOUND);
    }

    const brandResponse = {
      id: response.id,
      name: response.name,
      visible: response.visible,
    };
    return brandResponse;
  }

  public async delete(id: number) {
    const response = await this.brandRepository.delete(id);

    if (!response) {
      throw new AppError("Marca não encontrada", StatusCodes.NOT_FOUND);
    }

    return {
      message: "Marca deletada com sucesso",
    };
  }
}
