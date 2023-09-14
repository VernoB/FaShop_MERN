import { Request, Response, NextFunction } from "express";

export const findUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).send({ Message: "Value updated" });
};
