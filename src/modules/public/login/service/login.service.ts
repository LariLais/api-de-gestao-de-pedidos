import { ILogin } from "../interfaces/ILogin";
import { LoginRepository } from "../repository/login.model";
const loginRepository = new LoginRepository();

export class LoginService {
  public async login(login: ILogin) {
    const user = await loginRepository.getUser(login.email);
    const equalPassword = await loginRepository.verifyHashedPassword(
      login.email,
      login.password,
    );

    if (equalPassword === false) {
      throw new Error("Credenciais inválidas.");
    }
  }
}
