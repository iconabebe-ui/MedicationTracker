app.use("/auth", authRoutes);
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../data/users.js";

const router = express.Router();
const JWT_SECRET = "super_secret_key"; // later move to .env

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  const existingUser = users.find(u => u.email === email);
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id: Date.now(),
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: "User registered successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;

