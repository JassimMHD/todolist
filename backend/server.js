import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./controllers/authController.js";
import todoRouter from "./controllers/todoController.js";
import dbConn from "./config/dbConn.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

dbConn();

app.use(cors({ origin: process.env.URL, credentials: true }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
