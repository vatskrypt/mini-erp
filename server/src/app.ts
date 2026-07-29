import express from "express";
import cors from "cors"
import routes from "./routes/index.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Mini ERP API is running",
  });
});

app.use("/api", routes);

export default app;
