import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductList({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-gray-400"
      >
        <PackageSearch size={48} strokeWidth={1.2} className="mb-3 text-gray-300" />
        <p className="font-medium text-gray-500">Nenhum produto encontrado</p>
        <p className="text-sm mt-1">Tente ajustar os filtros ou cadastre um novo produto.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
        >
          <ProductCard product={product} onEdit={onEdit} onDelete={onDelete} />
        </motion.div>
      ))}
    </div>
  );
}
