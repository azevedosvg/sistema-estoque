import express from "express";
import cors from "cors";
import { productRoutes } from "./routes/productRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({
    message: "Inventory System API is running",
  });
});

app.use(productRoutes);
app.use(dashboardRoutes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
