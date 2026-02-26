import { Router } from "express";
import { PaymentMethodController } from "../controllers/paymentmethods.controller";

const paymentMethodRouter = Router();
const controller = new PaymentMethodController();

paymentMethodRouter.post("/", (req, res) => {
  controller.create(req, res);
});
paymentMethodRouter.get("/", (req, res) => {
  controller.getAll(req, res);
});
paymentMethodRouter.get("/:id", (req, res) => {
  controller.getById(req, res);
});
paymentMethodRouter.put("/:id", (req, res) => {
  controller.update(req, res);
});
paymentMethodRouter.delete("/:id", (req, res) => {
  controller.delete(req, res);
});

export { paymentMethodRouter };
