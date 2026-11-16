import type { Request, Response, NextFunction } from "express";

import { User } from "../models/index.js";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    });

    res.status(200).json({
      message: "Success",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
