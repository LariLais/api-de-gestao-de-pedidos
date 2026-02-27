import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../../errors/appError";
import {
  IPaymentMethodsInput,
  IPaymentMethodsResponse,
} from "../interface/IPaymentMethods";
import { PaymentMethodsRepository } from "../repository/paymentmethods.repository";
import { paymentMethodSchema } from "../schemas/paymentmethods.schema";

export class PaymentMethodsService {
  private repository = new PaymentMethodsRepository();

  public async create(
    body: IPaymentMethodsInput,
  ): Promise<IPaymentMethodsInput> {
    const data = paymentMethodSchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.repository.create(body);

    if (!response) {
      throw new AppError(
        "Erro ao criar método de pagamento",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const responseData: IPaymentMethodsResponse = {
      id: response.id,
      name: response.name,
      active: response.active ?? true,
    };

    return responseData;
  }
  public async update(
    id: number,
    body: IPaymentMethodsInput,
  ): Promise<IPaymentMethodsResponse> {
    const data = paymentMethodSchema.partial().safeParse(body);
    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }
    const response = await this.repository.update(id, body);
    if (!response) {
      throw new AppError(
        "Erro ao atualizar método de pagamento",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    const responseData: IPaymentMethodsResponse = {
      id: response.id,
      name: response.name,
      active: response.active ?? true,
    };
    return responseData;
  }
  public async getById(id: number): Promise<IPaymentMethodsResponse> {
    const response = await this.repository.getById(id);
    if (!response) {
      throw new AppError(
        "Método de pagamento não encontrado",
        StatusCodes.NOT_FOUND,
      );
    }
    const responseData: IPaymentMethodsResponse = {
      id: response.id,
      name: response.name,
      active: response.active ?? true,
    };
    return responseData;
  }
  public async getAll(): Promise<IPaymentMethodsResponse[]> {
    const response = await this.repository.getAll();
    if (!response) {
      throw new AppError(
        "Nenhum método de pagamento encontrado",
        StatusCodes.NOT_FOUND,
      );
    }
    const responseData: IPaymentMethodsResponse[] = response.map((payment) => ({
      id: payment.id,
      name: payment.name,
      active: payment.active ?? true,
    }));
    return responseData;
  }
  public async delete(id: number) {
    const response = await this.repository.delete(id);
    if (!response) {
      throw new AppError(
        "Erro ao deletar método de pagamento",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    return { message: "Método de pagamento deletado com sucesso" };
  }
}
