import { Router } from "express";
import { loginRouter } from "../modules/public/login/routes/login.routes";

const router = Router();

router.use("/login", loginRouter);

export { router };
