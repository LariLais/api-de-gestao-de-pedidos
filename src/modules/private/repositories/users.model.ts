import { prisma } from "../../../../prisma/config/prisma";
import { generateHashedPassword } from "../../../utils/generateHashedPassword";
import { IUserCreateInput, IUserCreateOutput } from "../interfaces/IUser";

export class UserRepository {
  public async createUser(data: IUserCreateInput): Promise<IUserCreateOutput> {
    const hashedPassword = await generateHashedPassword(data.password);

    const user = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        cellphone: data.cellphone,
        password_hash: hashedPassword,
        city: data.city,
        neighborhood: data.neighborhood,
        number: data.number,
        state: data.state,
        street: data.street,
        zip_code: data.zipcode,
        role: data.role,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
