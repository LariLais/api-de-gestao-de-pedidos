import { Router } from "express";
import { ProductController } from "../controllers/products.controller";

const productRouter = Router();
const controller = new ProductController();

productRouter.post("/", (req, res) => {
  controller.create(req, res);
});
productRouter.get("/", (req, res) => {
  controller.getAll(req, res);
});
productRouter.get("/:id", (req, res) => {
  controller.getById(req, res);
});
productRouter.put("/:id", (req, res) => {
  controller.update(req, res);
});
productRouter.delete("/:id", (req, res) => {
  controller.delete(req, res);
});

export { productRouter };
