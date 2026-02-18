import { prisma } from "../../../../../prisma/config/prisma";
import { ILoginUserResponse } from "../interfaces/ILogin";
import bcrypt from "bcrypt";

export class LoginRepository {
  public async getUser(email: string): Promise<ILoginUserResponse> {
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
    return user;
  }
  public async verifyHashedPassword(email: string, password: string) {
    const user = await this.getUser(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const equalPasswords = await bcrypt.compare(
      hashedPassword,
      user.password_hash,
    );
    const result = equalPasswords === true ? true : false;
    return result;
  }
}
