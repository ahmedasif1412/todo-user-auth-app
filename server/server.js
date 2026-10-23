import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/api/todos", todoRouter);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`The server is running at: http://localhost:${PORT}`);
  });
};
startServer();
