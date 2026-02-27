import { Router } from "express";
import { roleMiddleware } from "../../../../middlewares/roleMiddleware";
import { CategoryController } from "../controller/categories.controller";

const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post(
  "/",
  (req, res) => {
    controller.create(req, res);
  },
  roleMiddleware(["ADMIN"]),
);
categoryRouter.get(
  "/",
  (req, res) => {
    controller.getAll(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
categoryRouter.get(
  "/:id",
  (req, res) => {
    controller.getById(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
categoryRouter.put(
  "/:id",
  (req, res) => {
    controller.update(req, res);
  },
  roleMiddleware(["ADMIN", "STORE"]),
);
categoryRouter.delete(
  "/:id",
  (req, res) => {
    controller.delete(req, res);
  },
  roleMiddleware(["ADMIN"]),
);

export { categoryRouter };
