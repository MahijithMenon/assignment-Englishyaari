import express, { Request, Response } from "express";
import userRoutes from './routes/user.routes'
import productRoutes from './routes/product.routes'
import orderRoutes from './routes/order.routes'
import analyticsRoutes from './routes/analytics.routes'
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.use("/api/users",userRoutes);
app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);

export default app;