import "dotenv/config";
import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "../middlewares/errorMiddleware";
import { router } from "../routes/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT ?? 3001;
const allowedOrigins: string[] =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL as string]
    : [`http://localhost:${PORT}`];

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => res.json({ message: "API rodando com sucesso!" }));

app.use("/", router);
app.use(errorMiddleware);

export { app };
