import { Decimal } from "@prisma/client/runtime/index-browser";
import { $Enums } from "../../../generated/prisma/browser";

export interface IOrdersInput {
  userId: number;
  paymentMethodId: number;
  status: $Enums.orders_status;
  totalAmount: Decimal;
  orderItems: {
    productId: number;
    quantity: number;
    unitPrice: Decimal;
  }[];
}

export interface IOrdersItemsInput {
  productId: number;
  quantity: number;
  unitPrice: Decimal;
}

export interface IOrdersResponse {
  id: number;
  userId: number;
  paymentMethodId: number;
  status: $Enums.orders_status;
  totalAmount: Decimal;
  orderItems: {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: Decimal;
  }[];
}

export interface IOrdersStatus {
  status: $Enums.orders_status;
}
