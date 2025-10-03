import { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/todos")
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.log(err));
  }, []);

  const handleInputChange = (event) => setInputValue(event.target.value);
  
  
  
  
  const handleAdd = () => {
    fetch("http://localhost:5000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: inputValue })
  })
    .then(res => res.json())
    .then(newTodo => {
      setTodos([...todos, newTodo]);
      setInputValue("");
    })
    .catch(err => console.log(err));
  };




const handleDelete = (id) => {
  fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" })
    .then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    })
    .catch(err => console.log(err));
};
  
  
  
  
  
  const handleEdit = (id, currentText) => {
  setEditIndex(id);
  setEditValue(currentText);
};
  
  
  
  
  
  const handleSave = () => {
  fetch(`http://localhost:5000/todos/${editIndex}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: false, text: editValue }) // we allow updating text too
  })
    .then(res => res.json())
    .then(updatedTodo => {
      setTodos(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
      setEditIndex(null);
      setEditValue("");
    })
    .catch(err => console.log(err));
};
  
  
  
  
  const handleCancel = () => { setEditIndex(null); setEditValue(""); };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl  font-sans">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">To-Do List</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 px-3 py-2 border  border-gray-600 "
          placeholder="Enter new todo"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-950 text-white "
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <div key={todo._id} className="flex gap-3 items-center">
            {editIndex === todo._id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-3 py-2 border  border-gray-600 "
                />
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-950 text-white  "
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-600 text-white  "
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={todo.text}
                  disabled
                  className="flex-1 px-3 py-2 border  border-gray-600 bg-gray-100 text-gray-700"
                />
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="px-3 py-1 bg-teal-600 text-white  "
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(todo._id, todo.text)}
                  className="px-3 py-1 bg-teal-600 text-white  "
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
