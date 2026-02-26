import { Router } from "express";
import { BrandControlller } from "../controllers/brands.controller";
import { roleMiddleware } from "../../../middlewares/roleMiddleware";

const brandRouter = Router();
const controller = new BrandControlller();

brandRouter.post(
  "/",
  (req, res) => {
    controller.create(req, res);
  },
  roleMiddleware(["ADMIN"]),
);
brandRouter.get(
  "/",
  (req, res) => {
    controller.getAll(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
brandRouter.get(
  "/:id",
  (req, res) => {
    controller.getById(req, res);
  },
  roleMiddleware(["ADMIN", "CUSTOMER", "STORE"]),
);
brandRouter.put(
  "/:id",
  (req, res) => {
    controller.update(req, res);
  },
  roleMiddleware(["ADMIN", "STORE"]),
);
brandRouter.delete(
  "/:id",
  (req, res) => {
    controller.delete(req, res);
  },
  roleMiddleware(["ADMIN"]),
);

export { brandRouter };
