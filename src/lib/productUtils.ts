import type { Product } from "../types/product";

type StoredProduct = Omit<Product, "status" | "daysToExpire" | "riskValue">;

export function getDaysToExpire(expirationDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expirationDate + "T00:00:00");
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getProductStatus(expirationDate: string): Product["status"] {
  const days = getDaysToExpire(expirationDate);
  if (days < 0) return "expired";
  if (days <= 7) return "critical";
  if (days <= 30) return "attention";
  return "safe";
}

export function enrich(p: StoredProduct): Product {
  return {
    ...p,
    status: getProductStatus(p.expirationDate),
    daysToExpire: getDaysToExpire(p.expirationDate),
    riskValue: p.isDonation ? 0 : p.quantity * p.unitCost,
  };
}

export function calcDashboard(products: Product[]) {
  return {
    totalProducts: products.length,
    expiredProducts: products.filter((p) => p.status === "expired").length,
    criticalProducts: products.filter((p) => p.status === "critical").length,
    attentionProducts: products.filter((p) => p.status === "attention").length,
    safeProducts: products.filter((p) => p.status === "safe").length,
    totalRiskValue: products
      .filter((p) => !p.isDonation)
      .reduce((sum, p) => sum + p.riskValue, 0),
  };
}
