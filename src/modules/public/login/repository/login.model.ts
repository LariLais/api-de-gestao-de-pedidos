import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../../../prisma/config/prisma";
import { AppError } from "../../../../errors/appError";
import { ILoginUserResponse } from "../interfaces/ILogin";
import bcrypt from "bcrypt";

export class LoginRepository {
  public async getUser(email: string): Promise<ILoginUserResponse> {

    console.log(email)
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password_hash: true,
        role: true,
      },
    });

    console.log(user)

    if(!user) {
      throw new AppError("Usuário não encontrado.", StatusCodes.NOT_FOUND)
    }

    return user;
  }
  public async verifyHashedPassword(email: string, password: string) {
    const user = await this.getUser(email);
    const equalPasswords = await bcrypt.compare(
      password,
      user.password_hash,
    );
    const result = equalPasswords === true ? true : false;
    return result;
  }
}
