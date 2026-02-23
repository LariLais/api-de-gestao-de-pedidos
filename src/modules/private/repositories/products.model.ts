import { prisma } from "../../../../prisma/config/prisma";
import { IProductInput, IProductUpdateInput } from "../interfaces/IProduct";

export class ProductRepository {
  public async create(data: IProductInput) {
    const product = await prisma.products.create({
      data: {
        name: data.name,
        price: data.price,
        size: data.size,
        color_rgb: data.color_rgb,
        stock: data.stock,
        ...(data.visible !== undefined && {
          visible: data.visible,
        }),
        ...(data.categoryId !== undefined && {
          category_id: data.categoryId,
        }),
        ...(data.brandId !== undefined && {
          brand_id: data.brandId,
        }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
      },
    });
    return product;
  }
  public async update(id: number, data: IProductUpdateInput) {
    const product = await prisma.products.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.brandId !== undefined && { brand_id: data.brandId }),
        ...(data.categoryId !== undefined && { category_id: data.categoryId }),
        ...(data.color_rgb !== undefined && { color_rgb: data.color_rgb }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.size !== undefined && { size: data.size }),
        ...(data.stock !== undefined && { stock: data.stock }),
        ...(data.visible !== undefined && { visible: data.visible }),
      },
    });
    return product;
  }
  public async getById(id: number) {
    const product = await prisma.products.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
    return product;
  }
  public async getAll() {
    const products = await prisma.products.findMany({
      where: { deleted_at: null },
    });
    return products;
  }
  public async delete(id: number) {
    const product = await prisma.products.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
    return product;
  }
}
