import { Decimal } from "@prisma/client/runtime/index-browser";

export interface IProductInput {
  name: string;
  price: Decimal;
  size: string;
  color_rgb: string;
  stock: number;
  description?: string | undefined;
  visible?: boolean | undefined;
  categoryId?: number | undefined;
  brandId?: number | undefined;
}

export interface IProductUpdateInput {
  name?: string;
  price?: Decimal;
  size?: string;
  color_rgb?: string;
  stock?: number;
  description?: string | undefined;
  visible?: boolean | undefined;
  categoryId?: number | undefined;
  brandId?: number | undefined;
}

export interface IProductResponse {
  id: number;
  name: string;
  price: Decimal;
  size: string;
  color_rgb: string;
  stock: number;
  description: string;
  visible: string;
  categoryId: number;
  brandId: number;
}
