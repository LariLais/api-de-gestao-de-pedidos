export interface IPaymentMethodsInput {
  name: string;
  active: boolean | undefined;
}

export interface IPaymentMethodsResponse {
  id: number;
  name: string;
  active: boolean | undefined;
}
