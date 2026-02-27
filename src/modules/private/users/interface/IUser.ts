import { $Enums } from "../../../../generated/prisma/client";

export interface IUserCreateInput {
  name: string;
  email: string;
  password: string;
  role: $Enums.users_role;
  cellphone: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: $Enums.users_state;
  zipcode: string;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  role: $Enums.users_role;
  cellphone: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: $Enums.users_state;
  zipcode: string;
}

export interface IUserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  role?: $Enums.users_role;
  cellphone?: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  city?: string;
  state?: $Enums.users_state;
  zipcode?: string;
}
