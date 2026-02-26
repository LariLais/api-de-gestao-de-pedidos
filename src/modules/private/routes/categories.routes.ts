import { Router } from "express";
import { CategoryController } from "../controllers/categories.controller";

const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post("/", (req, res) => {
  controller.create(req, res);
});
categoryRouter.get("/", (req, res) => {
  controller.getAll(req, res);
});
categoryRouter.get("/:id", (req, res) => {
  controller.getById(req, res);
});
categoryRouter.put("/:id", (req, res) => {
  controller.update(req, res);
});
categoryRouter.delete("/:id", (req, res) => {
  controller.delete(req, res);
});

export { categoryRouter };
