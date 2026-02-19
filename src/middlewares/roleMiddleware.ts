import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../utils/responseHandler";
import { $Enums } from "../generated/prisma/client";

export function roleMiddleware(allowedRoles: $Enums.users_role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;

      if (!user) {
        return ResponseHandler.unauthorized(res, "Usuário não autenticado.");
      }

      if (!allowedRoles.includes(user.role)) {
        return ResponseHandler.forbidden(res);
      }

      return next();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  };
}
