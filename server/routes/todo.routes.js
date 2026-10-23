import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from "../controller/todo.controller.js";
import { verifyToken } from "../middleware/auth.js";

const todoRoutes = express.Router();

todoRoutes.use(verifyToken);

todoRoutes.post("/", createTodo);
todoRoutes.get("/", getTodos);
todoRoutes.put("/:id", updateTodo);
todoRoutes.patch("/:id", toggleTodo);
todoRoutes.delete("/:id", deleteTodo);

export default todoRoutes;
