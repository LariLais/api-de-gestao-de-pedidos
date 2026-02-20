import { prisma } from "../../../../prisma/config/prisma";
import { ICategoryInput, ICategoryResponse } from "../interfaces/ICategory";

export class CategoriesRepository {
  public async createCategory(
    data: ICategoryInput,
  ): Promise<ICategoryResponse> {
    const category = await prisma.categories.create({
      data: {
        name: data.name,
      },
    });

    return {
      id: category.id,
      name: category.name,
      created_at: category.created_at,
      updated_at: category.updated_at,
    };
  }

  public async updateCategory(
    categoryId: number,
    data: ICategoryInput,
  ): Promise<ICategoryResponse> {
    const category = await prisma.categories.update({
      where: {
        id: categoryId,
      },
      data: {
        name: data.name,
        updated_at: new Date(),
      },
    });

    return {
      id: category.id,
      name: category.name,
      created_at: category.created_at,
      updated_at: category.updated_at,
    };
  }

  public async getCategoryById(id: number) {
    const category = await prisma.categories.findUnique({
      where: {
        id,
        deleted_at: null,
      },
    });

    return category;
  }

  public async getAllCategories() {
    const categories = await prisma.categories.findMany({
      where: {
        deleted_at: null,
      },
    });

    return categories;
  }

  public async deleteCategory(id: number) {
    const category = await prisma.categories.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
