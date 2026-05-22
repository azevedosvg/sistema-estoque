import { Router } from "express";

import { products } from "../data/products";
import { calculateRiskValue } from "../utils/calculateRiskValue";
import { getProductStatus } from "../utils/getProductStatus";

const dashboardRoutes = Router();

dashboardRoutes.get("/dashboard", (request, response) => {
  const totalProducts = products.length;

  const expiredProducts = products.filter(
    (product) => getProductStatus(product.expirationDate) === "expired",
  ).length;

  const criticalProducts = products.filter(
    (product) => getProductStatus(product.expirationDate) === "critical",
  ).length;

  const attentionProducts = products.filter(
    (product) => getProductStatus(product.expirationDate) === "attention",
  ).length;

  const safeProducts = products.filter(
    (product) => getProductStatus(product.expirationDate) === "safe",
  ).length;

  const totalRiskValue = products.reduce((total, product) => {
    return total + calculateRiskValue(product.quantity, product.unitCost);
  }, 0);

  return response.json({
    totalProducts,
    expiredProducts,
    criticalProducts,
    attentionProducts,
    safeProducts,
    totalRiskValue,
  });
});

export { dashboardRoutes };
