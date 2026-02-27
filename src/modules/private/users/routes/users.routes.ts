import { Router } from "express";
import { roleMiddleware } from "../../../../middlewares/roleMiddleware";
import { UserController } from "../controller/users.controller";

const userRouter = Router();
const controller = new UserController();

userRouter.post(
  "/",
  (req, res) => {
    controller.createUser(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER"]),
);
userRouter.put(
  "/:id",
  (req, res) => {
    controller.updateUser(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER"]),
);
userRouter.get(
  "/:id",
  (req, res) => {
    controller.getUserById(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
userRouter.get(
  "/role/:role",
  (req, res) => {
    controller.getUsersByRole(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);

export { userRouter };
