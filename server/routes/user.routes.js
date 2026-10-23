import express from "express";
import { login, register } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/user", verifyToken, (req, res) => {
  res.json({ name: req.name });
});

export default userRoutes;
