import { Router } from "express";

import { findUsers } from "../controllers/user.controller";
import { findProduct, findProducts } from "../controllers/products.controller";

export const routes = (routes: Router) => {
  //Users Middleware routes
  routes.get("/api/users", findUsers);

  //Products Middleware routes
  routes.get("/api/products", findProducts);
  routes.get("/api/product/:productId", findProduct);
};
