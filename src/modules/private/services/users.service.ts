import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../errors/appError";
import {
  IUserCreateInput,
  IUserCreateOutput,
  IUserOutput,
  IUserUpdateInput,
} from "../interfaces/IUser";
import { UserRepository } from "../repositories/users.model";
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schema";
import { $Enums } from "../../../generated/prisma/client";

export class UserService {
  private userRepository = new UserRepository();

  public async createUser(body: IUserCreateInput): Promise<IUserCreateOutput> {
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

    return response;
  }

  public async updateUser(
    id: number,
    body: Partial<IUserCreateInput>,
  ): Promise<IUserUpdateInput> {
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

    return response;
  }

  public async getUserById(id: number): Promise<IUserOutput> {
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

    return responseReturn;
  }

  public async getUsersByRole(role: $Enums.users_role): Promise<IUserOutput[]> {
    const response = await this.userRepository.getUsersByRole(role);

    if (!response || response.length === 0) {
      throw new AppError("Nenhum usuário encontrado", StatusCodes.NOT_FOUND);
    }

    const responseFormatted = response.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    });

    return responseFormatted;
  }
}
