import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../utils/responseHandler";
import { AppError } from "../errors/appError";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return ResponseHandler.error(res, err.message, err.statusCode);
  }
  return ResponseHandler.error(res, "Erro interno do servidor", 500);
}
