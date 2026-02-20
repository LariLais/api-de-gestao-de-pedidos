import { Router } from "express";
import { UserController } from "../controllers/users.controller";

const userRouter = Router();
const controller = new UserController();

userRouter.post("/", (req, res) => {
  controller.createUser(req, res);
});
userRouter.put("/:id", (req, res) => {
  controller.updateUser(req, res);
});
userRouter.get("/:id", (req, res) => {
  controller.getUserById(req, res);
});
userRouter.get("/role/:role", (req, res) => {
  controller.getUsersByRole(req, res);
});

export { userRouter };
