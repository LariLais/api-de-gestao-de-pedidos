import { Router } from "express";
import { LoginController } from "../controller/login.controller";

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post("/", (req, res) => loginController.login(req, res));

export { loginRouter };
