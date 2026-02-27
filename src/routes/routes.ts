import { Router } from "express";
import { loginRouter } from "../modules/public/login/routes/login.routes";
import { autenticate } from "../modules/public/login/middleware/autentication.middleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { userRouter } from "../modules/private/users/routes/users.routes";
import { productRouter } from "../modules/private/products/routes/products.routes";
import { paymentMethodRouter } from "../modules/private/paymentMethods/routes/paymentmethods.routes";
import { orderRouter } from "../modules/private/orders/routes/orders.routes";
import { categoryRouter } from "../modules/private/categories/routes/categories.routes";
import { brandRouter } from "../modules/private/brands/routes/brands.routes";

const router = Router();

router.use("/login", loginRouter);
router.use("/users", autenticate, userRouter);
router.use("/products", autenticate, productRouter);
router.use("/payments", autenticate, paymentMethodRouter);
router.use("/orders", autenticate, orderRouter);
router.use("/categories", autenticate, categoryRouter);
router.use("/brands", autenticate, brandRouter);

export { router };
