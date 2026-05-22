import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unitCost: number;
  expirationDate: string;
  status: "expired" | "critical" | "attention" | "safe";
  daysToExpire: number;
  riskValue: number;
};

type DashboardData = {
  totalProducts: number;
  expiredProducts: number;
  criticalProducts: number;
  attentionProducts: number;
  safeProducts: number;
  totalRiskValue: number;
};

function translateProductStatus(status: Product["status"]) {
  const statusMap: Record<Product["status"], string> = {
    expired: "Vencido",
    critical: "Crítico",
    attention: "Atenção",
    safe: "Seguro",
  };

  return statusMap[status];
}

function getProductStatusClass(status: Product["status"]) {
  const statusClassMap: Record<Product["status"], string> = {
    expired: "status-badge expired",
    critical: "status-badge critical",
    attention: "status-badge attention",
    safe: "status-badge safe",
  };

  return statusClassMap[status];
}

function formatDaysToExpire(daysToExpire: number) {
  if (daysToExpire < 0) {
    return `Vencido há ${Math.abs(daysToExpire)} dia(s)`;
  }

  if (daysToExpire === 0) {
    return "Vence hoje";
  }

  return `Vence em ${daysToExpire} dia(s)`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unitCost: "",
    expirationDate: "",
  });

  async function loadProducts() {
    const response = await fetch("http://localhost:3333/products");
    const data = await response.json();

    setProducts(data);
  }

  async function loadDashboardData() {
    const response = await fetch("http://localhost:3333/dashboard");
    const data = await response.json();

    setDashboardData(data);
  }

  useEffect(() => {
    loadProducts();
    loadDashboardData();
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("http://localhost:3333/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        category: formData.category,
        quantity: Number(formData.quantity),
        unitCost: Number(formData.unitCost),
        expirationDate: formData.expirationDate,
      }),
    });

    if (!response.ok) {
      alert("Não foi possível cadastrar o produto. Verifique os dados.");
      return;
    }

    await response.json();

    await loadProducts();
    await loadDashboardData();

    setFormData({
      name: "",
      category: "",
      quantity: "",
      unitCost: "",
      expirationDate: "",
    });
  }

  return (
    <main className="container">
      <section className="hero">
        <span className="badge">Projeto Fullstack</span>

        <h1>Sistema de Estoque</h1>

        <p className="subtitle">
          Controle de validade, lotes e prevenção de perdas para pequenos
          comércios.
        </p>

        <div className="hero-actions">
          <button>Entrar no Sistema</button>
          <button className="secondary">Ver funcionalidades</button>
        </div>
      </section>

      {dashboardData && (
        <section className="dashboard-grid">
          <article className="dashboard-card">
            <span>Total de produtos</span>
            <strong>{dashboardData.totalProducts}</strong>
          </article>

          <article className="dashboard-card">
            <span>Vencidos</span>
            <strong>{dashboardData.expiredProducts}</strong>
          </article>

          <article className="dashboard-card">
            <span>Críticos</span>
            <strong>{dashboardData.criticalProducts}</strong>
          </article>

          <article className="dashboard-card">
            <span>Em atenção</span>
            <strong>{dashboardData.attentionProducts}</strong>
          </article>

          <article className="dashboard-card">
            <span>Seguros</span>
            <strong>{dashboardData.safeProducts}</strong>
          </article>

          <article className="dashboard-card highlight">
            <span>Valor total em risco</span>
            <strong>{formatCurrency(dashboardData.totalRiskValue)}</strong>
          </article>
        </section>
      )}

      <section className="cards">
        <article className="card">
          <h2>Problema</h2>
          <p>
            Pequenos comércios frequentemente perdem produtos por vencimento
            devido à falta de controle sobre validade, lote e quantidade em
            estoque.
          </p>
        </article>

        <article className="card">
          <h2>Solução</h2>
          <p>
            O sistema permite cadastrar produtos, monitorar datas de validade,
            gerar alertas e visualizar indicadores para reduzir perdas
            financeiras.
          </p>
        </article>

        <article className="card">
          <h2>Diferencial</h2>
          <p>
            Além do controle de estoque, a aplicação prioriza produtos em risco
            e apoia decisões como promoção, doação ou descarte.
          </p>
        </article>
      </section>

      <section className="form-section">
        <h2>Cadastrar produto</h2>

        <form className="product-form" onSubmit={handleCreateProduct}>
          <div className="form-group">
            <label htmlFor="name">Nome do produto</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ex: Leite Integral"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <input
              id="category"
              name="category"
              type="text"
              placeholder="Ex: Laticínios"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantidade</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Ex: 20"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="unitCost">Custo unitário</label>
            <input
              id="unitCost"
              name="unitCost"
              type="number"
              step="0.01"
              placeholder="Ex: 4.50"
              value={formData.unitCost}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="expirationDate">Data de validade</label>
            <input
              id="expirationDate"
              name="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Cadastrar produto</button>
        </form>
      </section>

      <section className="products-section">
        <h2>Produtos cadastrados</h2>

        <div className="products-list">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p>Categoria: {product.category}</p>
              <p>Quantidade: {product.quantity}</p>
              <p>Custo unitário: {formatCurrency(product.unitCost)}</p>
              <p>Valor em risco: {formatCurrency(product.riskValue)}</p>
              <p>Validade: {product.expirationDate}</p>

              <p>
                Status:{" "}
                <span className={getProductStatusClass(product.status)}>
                  {translateProductStatus(product.status)}
                </span>
              </p>

              <p>{formatDaysToExpire(product.daysToExpire)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
