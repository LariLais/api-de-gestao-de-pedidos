import { Router } from "express";
import { roleMiddleware } from "../../../../middlewares/roleMiddleware";
import { OrderController } from "../controller/orders.controller";

const orderRouter = Router();
const controller = new OrderController();

orderRouter.post(
  "/",
  (req, res) => {
    controller.create(req, res);
  },
  roleMiddleware(["ADMIN"]),
);
orderRouter.get(
  "/",
  (req, res) => {
    controller.getAll(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
orderRouter.get(
  "/:id",
  (req, res) => {
    controller.getById(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
orderRouter.put(
  "/:id",
  (req, res) => {
    controller.updateOrderStatus(req, res);
  },
  roleMiddleware(["ADMIN", "STORE"]),
);

export { orderRouter };
