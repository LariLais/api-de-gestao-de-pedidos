import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../../../../utils/responseHandler";
import jwt from "jsonwebtoken";

const TOKEN_SECRET =
  process.env.TOKEN_SECRET ||
  "OCOeUnIijBBl08ViS3eyPPyFw5WdgqgsaNQCtpIrGKqtTN6cZzFNaDJfLXsI7n5ERB8w0jZMQrdnfggjU5qomo";

const SECURE_HTTP = process.env.SECURE_HTTP;

export async function autenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;

  if (!token) {
    return ResponseHandler.unauthorized(
      res,
      "Usuário não autenticado. Token não fornecido.",
    );
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    res.locals.user = decoded;
    next();
  } catch (error) {

    res.clearCookie("token", {
      httpOnly: true,
      secure: Boolean(SECURE_HTTP),
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 3,
    });

    return ResponseHandler.error(res, "Token inválido ou expirado.", 404, error)
  }
}
