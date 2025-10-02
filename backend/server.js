// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// connect to mongodb atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected..."))
.catch((err) => console.log(err));

// schema
const todoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false }
});

// model
const Todo = mongoose.model("Todo", todoSchema);

// routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  await todo.save();
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
