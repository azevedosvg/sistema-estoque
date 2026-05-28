import type { Product } from "../types/product";
import { enrich } from "./productUtils";

type StoredProduct = Omit<Product, "status" | "daysToExpire" | "riskValue">;
type User = { email: string; password: string };

const KEYS = {
  products: "ama_products",
  nextId: "ama_next_id",
  users: "ama_users",
};

// ─── Seed ────────────────────────────────────────────────────────────────────

const SEED: StoredProduct[] = [
  // Alimentos
  { id: 1,  name: "Leite Integral 1L",        category: "Alimentos",             quantity: 20, unitCost: 4.50,  expirationDate: "2026-07-10", isDonation: false },
  { id: 2,  name: "Feijão Carioca 1kg",        category: "Alimentos",             quantity: 30, unitCost: 8.90,  expirationDate: "2026-06-02", isDonation: false },
  { id: 3,  name: "Arroz Tipo 1 5kg",          category: "Alimentos",             quantity: 15, unitCost: 28.50, expirationDate: "2027-03-20", isDonation: false },
  { id: 4,  name: "Macarrão Espaguete 500g",   category: "Alimentos",             quantity: 45, unitCost: 4.50,  expirationDate: "2026-08-15", isDonation: false },
  { id: 5,  name: "Óleo de Soja 900ml",        category: "Alimentos",             quantity: 18, unitCost: 7.20,  expirationDate: "2026-05-10", isDonation: false },
  { id: 6,  name: "Açúcar Cristal 2kg",        category: "Alimentos",             quantity: 25, unitCost: 6.40,  expirationDate: "2027-01-01", isDonation: false },
  // Bebidas
  { id: 7,  name: "Achocolatado em Pó 400g",   category: "Bebidas",               quantity: 12, unitCost: 14.90, expirationDate: "2026-06-18", isDonation: false },
  { id: 8,  name: "Leite em Pó Integral 400g", category: "Bebidas",               quantity: 8,  unitCost: 18.50, expirationDate: "2026-06-01", isDonation: false },
  // Higiene
  { id: 9,  name: "Sabonete Antibacteriano",   category: "Higiene e Limpeza",     quantity: 60, unitCost: 2.90,  expirationDate: "2027-04-15", isDonation: false },
  { id: 10, name: "Pasta de Dente 90g",        category: "Higiene e Limpeza",     quantity: 35, unitCost: 4.50,  expirationDate: "2027-02-28", isDonation: false },
  { id: 11, name: "Fraldas Descartáveis P",    category: "Higiene e Limpeza",     quantity: 10, unitCost: 42.00, expirationDate: "2028-01-01", isDonation: false },
  // Medicamentos
  { id: 12, name: "Dipirona 500mg (cx 10cp)",  category: "Medicamentos",          quantity: 15, unitCost: 8.90,  expirationDate: "2026-06-03", isDonation: false },
  { id: 13, name: "Vitamina C 1g efervescente",category: "Medicamentos",          quantity: 20, unitCost: 12.50, expirationDate: "2027-06-01", isDonation: false },
  // Roupas — doação
  { id: 14, name: "Camiseta Infantil 4-6 anos",category: "Roupas",                quantity: 22, unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  { id: 15, name: "Calça Jeans Masculina G",   category: "Roupas",                quantity: 8,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  { id: 16, name: "Agasalho Infantil",         category: "Roupas",                quantity: 14, unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  { id: 17, name: "Vestido Feminino M",        category: "Roupas",                quantity: 6,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  // Calçados — doação
  { id: 18, name: "Tênis Infantil nº 30",      category: "Calçados",              quantity: 5,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  { id: 19, name: "Sandália Feminina nº 37",   category: "Calçados",              quantity: 7,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  // Eletrônicos — doação
  { id: 20, name: "Tablet Samsung 7 pol.",     category: "Eletrônicos",           quantity: 2,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  { id: 21, name: "Notebook Dell i3 8GB",      category: "Eletrônicos",           quantity: 1,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  // Brinquedos — doação
  { id: 22, name: "Jogo de Blocos de Montar",  category: "Brinquedos",            quantity: 8,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  { id: 23, name: "Bicicleta Infantil aro 16", category: "Brinquedos",            quantity: 2,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  // Material Escolar — doação
  { id: 24, name: "Mochila Escolar Infantil",  category: "Material Escolar",      quantity: 9,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  { id: 25, name: "Kit Lápis de Cor 12un",     category: "Material Escolar",      quantity: 30, unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  // Utensílios — doação
  { id: 26, name: "Panela Antiaderente 20cm",  category: "Utensílios Domésticos", quantity: 4,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
  { id: 27, name: "Conjunto de Talheres 24p",  category: "Utensílios Domésticos", quantity: 3,  unitCost: 0, expirationDate: "2099-12-31", isDonation: true },
];

// ─── Products ─────────────────────────────────────────────────────────────────

function readRaw(): StoredProduct[] {
  const raw = localStorage.getItem(KEYS.products);
  if (raw) return JSON.parse(raw) as StoredProduct[];
  // primeira vez: carrega o seed
  localStorage.setItem(KEYS.products, JSON.stringify(SEED));
  localStorage.setItem(KEYS.nextId, String(SEED.length + 1));
  return SEED;
}

function writeRaw(products: StoredProduct[]): void {
  localStorage.setItem(KEYS.products, JSON.stringify(products));
}

function nextId(): number {
  const id = parseInt(localStorage.getItem(KEYS.nextId) ?? "1");
  localStorage.setItem(KEYS.nextId, String(id + 1));
  return id;
}

export function getProducts(): Product[] {
  return readRaw().map(enrich);
}

export function createProduct(data: Omit<StoredProduct, "id">): Product {
  const raw = readRaw();
  const product: StoredProduct = { id: nextId(), ...data };
  writeRaw([...raw, product]);
  return enrich(product);
}

export function updateProduct(id: number, data: Omit<StoredProduct, "id">): Product {
  const raw = readRaw().map((p) => (p.id === id ? { id, ...data } : p));
  writeRaw(raw);
  return enrich({ id, ...data });
}

export function deleteProduct(id: number): void {
  writeRaw(readRaw().filter((p) => p.id !== id));
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

function readUsers(): User[] {
  return JSON.parse(localStorage.getItem(KEYS.users) ?? "[]") as User[];
}

export function registerUser(email: string, password: string): "ok" | "exists" {
  const users = readUsers();
  if (users.some((u) => u.email === email)) return "exists";
  localStorage.setItem(KEYS.users, JSON.stringify([...users, { email, password }]));
  return "ok";
}

export function loginUser(email: string, password: string): boolean {
  return readUsers().some((u) => u.email === email && u.password === password);
}
