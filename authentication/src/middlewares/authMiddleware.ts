import { NextFunction, Request, Response } from "express";

export interface SessionUser {
  id: number;
  name: string;
  email: string;
}

declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
  }
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.session.user) {
    res.redirect("/login");
    return;
  }

  next();
}

export function attachUserToLocals(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.locals.currentUser = req.session.user ?? null;
  next();
}
