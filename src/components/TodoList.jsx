import { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => setInputValue(event.target.value);
  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    setTodos(prev => [...prev, inputValue]);
    setInputValue("");
  };
  const handleDelete = (index) => setTodos(todos.filter((_, i) => i !== index));
  const handleEdit = (index) => { setEditIndex(index); setEditValue(todos[index]); };
  const handleSave = () => { 
    setTodos(todos.map((todo, i) => i === editIndex ? editValue : todo));
    setEditIndex(null);
    setEditValue("");
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
        {todos.map((todo, index) => (
          <div key={index} className="flex gap-3 items-center">
            {editIndex === index ? (
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
                  value={todo}
                  disabled
                  className="flex-1 px-3 py-2 border  border-gray-600 bg-gray-100 text-gray-700"
                />
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 bg-teal-600 text-white  "
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(index)}
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
