import { Router } from "express";
import { roleMiddleware } from "../../../../middlewares/roleMiddleware";
import { PaymentMethodController } from "../controller/paymentmethods.controller";

const paymentMethodRouter = Router();
const controller = new PaymentMethodController();

paymentMethodRouter.post(
  "/",
  (req, res) => {
    controller.create(req, res);
  },
  roleMiddleware(["ADMIN"]),
);
paymentMethodRouter.get(
  "/",
  (req, res) => {
    controller.getAll(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
paymentMethodRouter.get(
  "/:id",
  (req, res) => {
    controller.getById(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
paymentMethodRouter.put(
  "/:id",
  (req, res) => {
    controller.update(req, res);
  },
  roleMiddleware(["ADMIN", "STORE"]),
);
paymentMethodRouter.delete(
  "/:id",
  (req, res) => {
    controller.delete(req, res);
  },
  roleMiddleware(["ADMIN"]),
);

export { paymentMethodRouter };
