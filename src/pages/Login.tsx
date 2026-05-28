import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../lib/storage";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (loginUser(email, password)) {
      login(email);
      navigate("/");
    } else {
      setError("Email ou senha incorretos.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 bg-blue-700 flex-col items-center justify-center p-12 text-white relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600 rounded-full opacity-40" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-800 rounded-full opacity-40" />
        <div className="absolute top-1/3 right-8 w-24 h-24 bg-amber-400 rounded-full opacity-20" />

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-7xl mb-6 select-none"
          >
            🤲
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight mb-1">AMA</h1>
            <p className="text-blue-200 text-lg font-medium mb-6">Amigos Mãos Abertas</p>
            <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mb-6" />
            <p className="text-blue-100 text-base leading-relaxed max-w-xs">
              Sistema de Gestão de Estoque — controle de validade, quantidades e alertas de risco.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-8">
            <div className="text-4xl mb-2">🤲</div>
            <h1 className="text-2xl font-extrabold text-blue-700">AMA</h1>
            <p className="text-gray-400 text-sm">Amigos Mãos Abertas</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Bem-vindo de volta</h2>
            <p className="text-gray-400 text-sm mb-7">Faça login para acessar o sistema</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2.5 rounded-lg border border-red-100"
                >
                  <span className="text-base">⚠️</span>
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-1 shadow-sm"
              >
                {loading ? "Entrando..." : "Entrar"}
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Não tem conta?{" "}
              <Link to="/register" className="text-blue-700 font-semibold hover:underline">
                Cadastrar
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
