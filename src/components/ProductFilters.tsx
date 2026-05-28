import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "./ProductForm";
import type { Product } from "../types/product";

type SortOption = "" | "name" | "quantity" | "expirationDate" | "riskValue";

type Props = {
  searchQuery: string;
  statusFilter: "" | Product["status"];
  categoryFilter: string;
  sortOption: SortOption;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "" | Product["status"]) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
};

const selectClass =
  "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer";

export default function ProductFilters({
  searchQuery,
  statusFilter,
  categoryFilter,
  sortOption,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onSortChange,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.05 }}
      className="flex flex-wrap gap-3 mb-5"
    >
      {/* Busca */}
      <div className="relative flex-1 min-w-[200px]">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Filtro por categoria */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={15} className="text-gray-400 flex-shrink-0" />
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={selectClass}
        >
          <option value="">Todas as categorias</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Filtro por status */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as "" | Product["status"])}
        className={selectClass}
      >
        <option value="">Todos os status</option>
        <option value="expired">Vencido</option>
        <option value="critical">Crítico</option>
        <option value="attention">Atenção</option>
        <option value="safe">Seguro</option>
      </select>

      {/* Ordenação */}
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className={selectClass}
      >
        <option value="">Padrão</option>
        <option value="name">Nome (A-Z)</option>
        <option value="quantity">Quantidade</option>
        <option value="expirationDate">Validade</option>
        <option value="riskValue">Valor em risco</option>
      </select>
    </motion.div>
  );
}
