import { Router } from "express";
import { OrderController } from "../controllers/orders.controller";

const orderRouter = Router();
const controller = new OrderController();

orderRouter.post("/", (req, res) => {
  controller.create(req, res);
});
orderRouter.get("/", (req, res) => {
  controller.getAll(req, res);
});
orderRouter.get("/:id", (req, res) => {
  controller.getById(req, res);
});
orderRouter.put("/:id", (req, res) => {
  controller.updateOrderStatus(req, res);
});

export { orderRouter };
