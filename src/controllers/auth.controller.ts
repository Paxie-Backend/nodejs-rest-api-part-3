import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../models/index.js";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before storing it
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    res.status(201).json({
      message: "User successfully registered",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid email / password",
        data: null,
      });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).json({
        message: "Invalid password / email",
        data: null,
      });
      return;
    }

    const jwt_secret = process.env.JWT_SECRET;

    if (!jwt_secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      jwt_secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "User successfully logged in",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
