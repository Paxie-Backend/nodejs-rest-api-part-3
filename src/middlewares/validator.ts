import validator from "validator";
import User from "../models/user.model.js";
import type { Request, Response, NextFunction } from "express";

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      res.status(400).json({
        message: "Bad request",
        data: null,
      });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({
        message: "Invalid email",
        data: null,
      });
      return;
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      res.status(400).json({
        message: "Weak password",
        data: null,
      });
      return;
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        message: "Email already registered",
        data: null,
      });
      return;
    }

    req.body.name = name;
    req.body.email = email;

    next();
  } catch (error) {
    next(error);
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  let { email, password } = req.body;

  email = email?.trim().toLowerCase();

  if (!email || !password) {
    res.status(400).json({
      message: "Bad request",
      data: null,
    });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({
      message: "Invalid email",
      data: null,
    });
    return;
  }

  req.body.email = email;

  next();
};
