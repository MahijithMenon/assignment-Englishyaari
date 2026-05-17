// server.ts
import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();