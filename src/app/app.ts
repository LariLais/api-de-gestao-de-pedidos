import dotenv from "dotenv";
dotenv.config();
import cors, { CorsOptions } from "cors";
import env from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
env.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT ?? 3001;
const localhostUrl = `http://localhost:${PORT}`;

const allowedOrigins = [localhostUrl];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Não permitido pelo CORS."));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "API rodando com sucesso!" });
});

export { app };
