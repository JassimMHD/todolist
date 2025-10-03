import { Todo } from "../models/todoModel.js";
import { Router } from "express";
import { authMiddleware as auth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

router.post("/", auth, async (req, res) => {
  const todo = new Todo({ text: req.body.text, userId: req.userId });
  await todo.save();
  res.json(todo);
});

router.put("/:id", auth, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { text: req.body.text },
    { new: true }
  );
  res.json(todo);
});

router.delete("/:id", auth, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ msg: "Deleted" });
});

export default router;
