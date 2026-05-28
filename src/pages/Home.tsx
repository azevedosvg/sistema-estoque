import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ProductFilters from "../components/ProductFilters";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    dashboardData,
    editingProductId,
    formData,
    isSubmitting,
    feedbackMessage,
    feedbackType,
    fieldErrors,
    searchQuery,
    statusFilter,
    categoryFilter,
    sortOption,
    displayedProducts,
    setSearchQuery,
    setStatusFilter,
    setCategoryFilter,
    setSortOption,
    handleInputChange,
    handleSubmitProduct,
    handleEditProduct,
    handleDeleteProduct,
  } = useProducts();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">🤲</span>
            <div>
              <span className="font-extrabold text-blue-700 text-lg leading-none">AMA</span>
              <span className="hidden sm:inline text-gray-400 text-sm ml-2 font-normal">
                Amigos Mãos Abertas
              </span>
            </div>
          </div>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sair</span>
          </motion.button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dashboard */}
        {dashboardData && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">Visão Geral</h2>
              <p className="text-sm text-gray-400">Resumo atual do estoque</p>
            </div>
            <Dashboard data={dashboardData} />
          </motion.section>
        )}

        {/* Form section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">
              {editingProductId !== null ? "Editar Produto" : "Cadastrar Produto"}
            </h2>
            <p className="text-sm text-gray-400">
              {editingProductId !== null
                ? "Atualize as informações do produto selecionado"
                : "Preencha os dados para adicionar um novo item ao estoque"}
            </p>
          </div>
          <ProductForm
            formData={formData}
            fieldErrors={fieldErrors}
            isSubmitting={isSubmitting}
            isEditing={editingProductId !== null}
            feedbackMessage={feedbackMessage}
            feedbackType={feedbackType}
            onInputChange={handleInputChange}
            onSubmit={handleSubmitProduct}
          />
        </motion.section>

        {/* Product list section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Produtos</h2>
            <p className="text-sm text-gray-400">
              {displayedProducts.length}{" "}
              {displayedProducts.length === 1 ? "item encontrado" : "itens encontrados"}
            </p>
          </div>
          <ProductFilters
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            sortOption={sortOption}
            onSearchChange={setSearchQuery}
            onStatusChange={setStatusFilter}
            onCategoryChange={setCategoryFilter}
            onSortChange={setSortOption}
          />
          <ProductList
            products={displayedProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </motion.section>
      </main>
    </div>
  );
}
