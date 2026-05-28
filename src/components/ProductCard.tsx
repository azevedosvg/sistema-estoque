import { motion, type Variants } from "framer-motion";
import { CalendarDays, Gift, Pencil, Tag, Trash2, TrendingDown } from "lucide-react";
import type { Product } from "../types/product";

const STATUS_CONFIG: Record<
  Product["status"],
  { label: string; badge: string; border: string; dot: string }
> = {
  expired: {
    label: "Vencido",
    badge: "bg-red-100 text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  critical: {
    label: "Crítico",
    badge: "bg-orange-100 text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
  attention: {
    label: "Atenção",
    badge: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  safe: {
    label: "Seguro",
    badge: "bg-green-100 text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },
};

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  const config = STATUS_CONFIG[product.status];

  const formatted = new Intl.DateTimeFormat("pt-BR").format(
    new Date(product.expirationDate + "T00:00:00")
  );

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-2xl border ${config.border} p-5 flex flex-col gap-4 hover:shadow-md transition-shadow`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Tag size={11} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-400 truncate">{product.category}</span>
          </div>
        </div>
        <span
          className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-50 rounded-xl px-3 py-2">
          <p className="text-xs text-gray-400 mb-0.5">Quantidade</p>
          <p className="font-semibold text-gray-800">{product.quantity} un.</p>
        </div>
        <div className={`rounded-xl px-3 py-2 ${product.isDonation ? "bg-blue-50" : "bg-gray-50"}`}>
          <p className="text-xs text-gray-400 mb-0.5">Custo unit.</p>
          {product.isDonation ? (
            <div className="flex items-center gap-1">
              <Gift size={13} className="text-blue-500" />
              <p className="font-semibold text-blue-600 text-xs">Doação</p>
            </div>
          ) : (
            <p className="font-semibold text-gray-800">
              R$ {Number(product.unitCost).toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Expiration + risk */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <CalendarDays size={13} className="text-gray-400" />
          <span>Vence em {formatted}</span>
        </div>
        {!product.isDonation && product.riskValue > 0 && (
          <div className="flex items-center gap-1 text-purple-600 font-medium">
            <TrendingDown size={13} />
            R$ {product.riskValue.toFixed(2)}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-gray-50">
        <motion.button
          type="button"
          onClick={() => onEdit(product)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          <Pencil size={13} />
          Editar
        </motion.button>
        <motion.button
          type="button"
          onClick={() => onDelete(product.id)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
        >
          <Trash2 size={13} />
        </motion.button>
      </div>
    </motion.article>
  );
}
