import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
  text: String,
  userId: mongoose.Schema.Types.ObjectId,
});

const Todo = mongoose.model("Todo", todoSchema);
export { Todo };
