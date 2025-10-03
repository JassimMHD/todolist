import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());


await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected");


// schema user,todoo -------------------------------

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const todoSchema = new mongoose.Schema({
  text: String,
  userId: mongoose.Schema.Types.ObjectId,
});

 // -------- - -- schema ---------

  
const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);



const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.id;
  next();
};




app.post("/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({ name: req.body.name, email: req.body.email, password: hashed });
  await user.save();
  res.json({ msg: "User registered" });
});




app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const match = await bcrypt.compare(req.body.password, user.password);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});




app.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ user });
});




app.get("/todos", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});



app.post("/todos", auth, async (req, res) => {
  const todo = new Todo({ text: req.body.text, userId: req.userId });
  await todo.save();
  res.json(todo);
});



app.put("/todos/:id", auth, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { text: req.body.text },
    { new: true }
  );
  res.json(todo);
});



app.delete("/todos/:id", auth, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ msg: "Deleted" });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



