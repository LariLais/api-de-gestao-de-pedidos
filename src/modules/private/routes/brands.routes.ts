import { Router } from "express";
import { BrandControlller } from "../controllers/brands.controller";

const brandRouter = Router();
const controller = new BrandControlller();

brandRouter.post("/", (req, res) => {
  controller.create(req, res);
});
brandRouter.get("/", (req, res) => {
  controller.getAll(req, res);
});
brandRouter.get("/:id", (req, res) => {
  controller.getById(req, res);
});
brandRouter.put("/:id", (req, res) => {
  controller.update(req, res);
});
brandRouter.delete("/:id", (req, res) => {
  controller.delete(req, res);
});

export { brandRouter };
