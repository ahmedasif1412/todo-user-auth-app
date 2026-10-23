import users from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "The email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "New user is created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ message: "User doesn't exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password incorrect" });

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({ token, name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
