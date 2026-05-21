import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({
    message: "API do Sistema Estoque funcionando",
  });
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
