import { $Enums } from "../../../../generated/prisma/client";

export interface ILoginUserResponse {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: $Enums.users_role;
}

export interface ILogin {
  email: string;
  password: string;
}
