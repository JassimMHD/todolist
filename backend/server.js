import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import authRouter from "./controllers/authController.js";
import todoRouter from "./controllers/todoController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
