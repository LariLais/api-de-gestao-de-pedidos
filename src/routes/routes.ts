import { Router } from "express";
import { loginRouter } from "../modules/public/login/routes/login.routes";
import { autenticate } from "../modules/public/login/middleware/autentication.middleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { userRouter } from "../modules/private/routes/users.routes";

const router = Router();

router.use("/login", loginRouter);
router.use("/user", autenticate, roleMiddleware(["ADMIN"]), userRouter);

export { router };
