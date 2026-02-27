import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../../errors/appError";
import { UserRepository } from "../repository/users.repository";
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schema";
import { $Enums } from "../../../../generated/prisma/client";
import { IUserCreateInput, IUserResponse } from "../interface/IUser";

export class UserService {
  private userRepository = new UserRepository();

  public async createUser(body: IUserCreateInput): Promise<IUserResponse> {
    const data = userCreateSchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.userRepository.createUser(data.data);

    if (!response) {
      throw new AppError(
        "Erro ao criar usuário",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    return await this.formatResponse(response);
  }

  public async updateUser(
    id: number,
    body: Partial<IUserCreateInput>,
  ): Promise<IUserResponse> {
    const data = userUpdateSchema.safeParse(body);

    if (!data.success) {
      throw new Error(
        JSON.stringify(
          data.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    const response = await this.userRepository.updateUser(id, body);

    if (!response) {
      throw new AppError("Usuáerio não encontrado", StatusCodes.NOT_FOUND);
    }

    return await this.formatResponse(response);
  }

  public async getUserById(id: number): Promise<IUserResponse> {
    const response = await this.userRepository.getUserById(id);

    if (!response) {
      throw new AppError("Usuário não encontrado", StatusCodes.NOT_FOUND);
    }

    const responseReturn = {
      id: response.id,
      name: response.name,
      email: response.email,
      role: response.role,
    };

    return await this.formatResponse(response);
  }

  public async getUsersByRole(role: $Enums.users_role): Promise<IUserResponse> {
    const response = await this.userRepository.getUsersByRole(role);

    if (!response || response.length === 0) {
      throw new AppError("Nenhum usuário encontrado", StatusCodes.NOT_FOUND);
    }

    return await this.formatResponse(response);
  }

  private async formatResponse(data: any) {
    const dataFormatted: IUserResponse = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      cellphone: data.cellphone,
      street: data.street,
      neighborhood: data.neighborhood,
      number: data.number,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
    };
    return dataFormatted;
  }
}
