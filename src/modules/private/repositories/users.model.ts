import { prisma } from "../../../../prisma/config/prisma";
import { $Enums } from "../../../generated/prisma/client";
import { generateHashedPassword } from "../../../utils/generateHashedPassword";
import { IUserCreateInput, IUserUpdateInput } from "../interfaces/IUser";

export class UserRepository {
  public async createUser(data: IUserCreateInput) {
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

    return user;
  }
  public async updateUser(id: number, data: IUserUpdateInput) {
    if (data.password) {
      data.password = await generateHashedPassword(data.password);
    }

    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        name: data.name!,
        email: data.email!,
        cellphone: data.cellphone!,
        city: data.city!,
        password_hash: data.password!,
        neighborhood: data.neighborhood!,
        number: data.number!,
        state: data.state! as $Enums.users_state,
        zip_code: data.zipcode!,
        street: data.street!,
        role: data.role as $Enums.users_role,
      },
    });

    return user;
  }
  public async getUserById(id: number) {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
  public async getUsersByRole(role: $Enums.users_role) {
    const users = await prisma.users.findMany({
      where: {
        role,
      },
    });
    return users;
  }
}
