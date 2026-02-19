import { IUserCreateInput, IUserCreateOutput } from "../interfaces/IUser";
import { UserRepository } from "../repositories/users.model";
import { userCreateSchema } from "../schemas/users.schema";

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

    return response;
  }
}
