import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../../errors/appError";
import { ICategoryInput, ICategoryResponse } from "../interface/ICategory";
import { CategoriesRepository } from "../repository/categories.repository";
import { categorySchema } from "../schemas/categories.schema";

export class CategoryService {
  private categoryRepository = new CategoriesRepository();

  public async create(body: ICategoryInput): Promise<ICategoryResponse> {
    const data = categorySchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.categoryRepository.createCategory(data.data);

    if (!response) {
      throw new AppError(
        "Erro ao criar usuário",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    return response;
  }

  public async update(
    id: number,
    body: Partial<ICategoryInput>,
  ): Promise<ICategoryResponse> {
    const data = categorySchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.categoryRepository.updateCategory(
      id,
      data.data,
    );

    if (!response) {
      throw new AppError("Categoria não encontrada.", StatusCodes.NOT_FOUND);
    }

    return response;
  }

  public async getById(id: number): Promise<ICategoryResponse> {
    const response = await this.categoryRepository.getCategoryById(id);

    if (!response) {
      throw new AppError("Categoria não encontrada.", StatusCodes.NOT_FOUND);
    }

    return response;
  }

  public async getAll(): Promise<ICategoryResponse[]> {
    const response = await this.categoryRepository.getAllCategories();

    if (!response || response.length === 0) {
      throw new AppError(
        "Não há categorias cadastradas",
        StatusCodes.NOT_FOUND,
      );
    }

    return response;
  }

  public async delete(id: number) {
    const response = await this.categoryRepository.deleteCategory(id);

    if (!response) {
      throw new AppError("Categoria não encontrada.", StatusCodes.NOT_FOUND);
    }

    return {
      message: "Categoria deletada com sucesso",
    };
  }
}
