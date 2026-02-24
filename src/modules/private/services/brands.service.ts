import { IBrandInput, IBrandResponse } from "../interfaces/IBrands";
import { BrandsRepository } from "../repositories/brands.model";

export class BrandService {
  private readonly brandRepository = new BrandsRepository();

  public async create(body: IBrandInput): Promise<IBrandResponse> {
    const data = 
  }

  public async update() {}

  public async getAll() {}

  public async getById() {}

  public async delete() {}
}
