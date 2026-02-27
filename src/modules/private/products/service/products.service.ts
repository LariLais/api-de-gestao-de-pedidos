import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../../errors/appError";
import { IProductInput, IProductResponse } from "../interface/IProduct";
import { ProductRepository } from "../repository/products.repository";
import { productSchema } from "../schemas/products.schema";

export class ProductService {
  private repository = new ProductRepository();

  public async create(body: IProductInput): Promise<IProductResponse> {
    const data = productSchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.repository.create(data.data);
    if (!response) {
      throw new AppError(
        "Erro ao criar produto",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    const responseData: IProductResponse = {
      id: response.id,
      name: response.name,
      price: response.price,
      size: response.size,
      color_rgb: response.color_rgb,
      stock: response.stock,
      description: response.description ?? "",
      visible: response.visible ?? true,
      categoryId: response.category_id ?? undefined,
      brandId: response.brand_id ?? undefined,
    };
    return responseData;
  }
  public async update(
    id: number,
    body: IProductInput,
  ): Promise<IProductResponse> {
    const data = productSchema.partial().safeParse(body);
    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.repository.update(id, data.data);

    if (!response) {
      throw new AppError(
        "Erro ao atualizar produto",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const responseData: IProductResponse = {
      id: response.id,
      name: response.name,
      price: response.price,
      size: response.size,
      color_rgb: response.color_rgb,
      stock: response.stock,
      description: response.description ?? "",
      visible: response.visible ?? true,
      categoryId: response.category_id ?? undefined,
      brandId: response.brand_id ?? undefined,
    };
    return responseData;
  }
  public async getById(id: number): Promise<IProductResponse> {
    const response = await this.repository.getById(id);
    if (!response) {
      throw new AppError("Produto não encontrado", StatusCodes.NOT_FOUND);
    }
    const responseData: IProductResponse = {
      id: response.id,
      name: response.name,
      price: response.price,
      size: response.size,
      color_rgb: response.color_rgb,
      stock: response.stock,
      description: response.description ?? "",
      visible: response.visible ?? true,
      categoryId: response.category_id ?? undefined,
      brandId: response.brand_id ?? undefined,
    };
    return responseData;
  }
  public async getAll(): Promise<IProductResponse[]> {
    const response = await this.repository.getAll();
    if (!response) {
      throw new AppError("Nenhum produto encontrado", StatusCodes.NOT_FOUND);
    }
    const responseData: IProductResponse[] = response.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.size,
      color_rgb: product.color_rgb,
      stock: product.stock,
      description: product.description ?? "",
      visible: product.visible ?? true,
      categoryId: product.category_id ?? undefined,
      brandId: product.category_id ?? undefined,
    }));
    return responseData;
  }
  public async delete(id: number) {
    const response = await this.repository.delete(id);
    if (!response) {
      throw new AppError(
        "Erro ao deletar produto",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    return { message: "Produto deletado com sucesso" };
  }
}
