import { prisma } from "../../../../prisma/config/prisma";
import { IBrandInput } from "../interfaces/IBrands";

export class BrandsRepository {
  public async create(data: IBrandInput) {
    const brand = await prisma.brands.create({
      data: {
        name: data.name,
        visible: data.visible ?? true,
      },
    });
    return brand;
  }

  public async update(id: number, data: IBrandInput) {
    const brand = await prisma.brands.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        ...(data.visible !== undefined && { visible: data.visible }),
      },
    });
    return brand;
  }

  public async getById(id: number) {
    const brand = await prisma.brands.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
    return brand;
  }

  public async getAll() {
    const brands = await prisma.brands.findMany({
      where: {
        deleted_at: null,
      },
    });
    return brands;
  }

  public async delete(id: number) {
    const brand = await prisma.brands.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
    return brand;
  }
}
