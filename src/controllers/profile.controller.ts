import type { Request, Response } from "express";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "Success",
    data: req.user,
  });
};
