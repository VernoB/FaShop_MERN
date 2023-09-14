import { NextFunction, Request, Response } from "express";

import { ProductType, productData } from "../models/products";

export const findProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).send(productData);
};

export const findProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  console.log(productId);
  console.log(req);
  const product = productData.find(
    (product) => product.id === Number(productId)
  );

  if (product === null || !product) {
    return res
      .status(404)
      .send({ Message: "Product not found or probably empty" });
  }

  return res.status(200).send(product);
};
