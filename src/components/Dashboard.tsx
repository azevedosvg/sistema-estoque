import { motion, type Variants } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, Package, ShieldAlert, TrendingDown } from "lucide-react";
import type { DashboardData } from "../types/product";

type Props = {
  data: DashboardData;
};

const cards = (data: DashboardData) => [
  {
    label: "Total de Produtos",
    value: data.totalProducts,
    icon: Package,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    textColor: "text-gray-900",
  },
  {
    label: "Produtos Vencidos",
    value: data.expiredProducts,
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    textColor: data.expiredProducts > 0 ? "text-red-600" : "text-gray-900",
    urgent: data.expiredProducts > 0,
  },
  {
    label: "Críticos",
    value: data.criticalProducts,
    icon: ShieldAlert,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    textColor: data.criticalProducts > 0 ? "text-orange-600" : "text-gray-900",
    urgent: data.criticalProducts > 0,
  },
  {
    label: "Em Atenção",
    value: data.attentionProducts,
    icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    textColor: data.attentionProducts > 0 ? "text-amber-600" : "text-gray-900",
  },
  {
    label: "Seguros",
    value: data.safeProducts,
    icon: CheckCircle2,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    textColor: "text-green-700",
  },
  {
    label: "Valor em Risco",
    value: `R$ ${data.totalRiskValue.toFixed(2)}`,
    icon: TrendingDown,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    textColor: data.totalRiskValue > 0 ? "text-purple-700" : "text-gray-900",
    isMonetary: true,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
};

export default function Dashboard({ data }: Props) {
  const items = cards(data);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4"
    >
      {items.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className={`bg-white rounded-2xl border p-4 flex flex-col gap-3 transition-shadow hover:shadow-md ${
              card.urgent ? "border-red-100" : "border-gray-100"
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
              <Icon size={18} className={card.iconColor} />
            </div>
            <div>
              <p className={`text-xl font-bold leading-tight ${card.textColor} ${card.isMonetary ? "text-base" : ""}`}>
                {card.value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">{card.label}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
