import { Router } from "express";
import { UserController } from "../controllers/users.controller";

const userRouter = Router();
const controller = new UserController();

userRouter.post("/", (req, res) => {
  controller.createUser(req, res);
});

export { userRouter };
