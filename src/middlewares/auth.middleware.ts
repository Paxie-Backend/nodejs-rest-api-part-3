import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization || "";

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401).json({
        message: "Invalid token",
        data: null,
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const user = jwt.verify(token, jwtSecret);

    if (typeof user === "string") {
      throw new Error("Invalid token payload");
    }

    req.user = {
      id: Number(user.id),
      name: String(user.name),
      email: String(user.email),
    };

    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
      data: null,
    });
  }
};
