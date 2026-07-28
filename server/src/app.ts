import express from "express";
import cors from "cors"
import routes from "./routes/index.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Mini ERP API is running",
  });
});

// TODO: Register routes here
// app.use("/auth", authRoutes);
// app.use("/customers", customerRoutes);
// app.use("/products", productRoutes);
// app.use("/challans", challanRoutes);

export default app;
