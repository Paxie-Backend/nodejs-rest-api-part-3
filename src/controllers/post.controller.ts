import type { Request, Response, NextFunction } from "express";
import { Post, User } from "../models/index.js";

export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "user_id", "title", "slug", "content"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      message: "Success",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export const showBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({
      where: { slug },
      attributes: ["id", "user_id", "title", "slug", "content"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!post) {
      res.status(404).json({
        message: "Post not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: "Success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
