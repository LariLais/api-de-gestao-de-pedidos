import { Router } from "express";
import { roleMiddleware } from "../../../../middlewares/roleMiddleware";
import { ProductController } from "../controller/products.controller";

const productRouter = Router();
const controller = new ProductController();

productRouter.post(
  "/",
  (req, res) => {
    controller.create(req, res);
  },
  roleMiddleware(["ADMIN"]),
);
productRouter.get(
  "/",
  (req, res) => {
    controller.getAll(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
productRouter.get(
  "/:id",
  (req, res) => {
    controller.getById(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
productRouter.put(
  "/:id",
  (req, res) => {
    controller.update(req, res);
  },
  roleMiddleware(["ADMIN", "STORE"]),
);
productRouter.delete(
  "/:id",
  (req, res) => {
    controller.delete(req, res);
  },
  roleMiddleware(["ADMIN"]),
);

export { productRouter };
