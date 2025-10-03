import { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  // const token = localStorage.getItem("token");
  // Load todos
  useEffect(
    function () {
      if (!token) return;
      fetch("http://localhost:5000/todos", {
        headers: { Authorization: "Bearer " + token },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          setTodos(data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    [token]
  );

  // Add todo
  function addTodo() {
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ text: input }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (newTodo) {
        setTodos(todos.concat(newTodo));
        setInput("");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // Delete todo
  function deleteTodo(id) {
    fetch("http://localhost:5000/todos/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })
      .then(function () {
        setTodos(
          todos.filter(function (t) {
            return t._id !== id;
          })
        );
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // Edit todo
  function startEdit(id, text) {
    setEditId(id);
    setEditText(text);
  }

  function saveEdit() {
    fetch("http://localhost:5000/todos/" + editId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ text: editText, completed: false }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (updated) {
        setTodos(
          todos.map(function (t) {
            return t._id === updated._id ? updated : t;
          })
        );
        setEditId(null);
        setEditText("");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function cancelEdit() {
    setEditId(null);
    setEditText("");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl font-sans">
      <h1 className="text-2xl font-bold text-center mb-6">To-Do List</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={input}
          onChange={function (e) {
            setInput(e.target.value);
          }}
          className="flex-1 px-3 py-2 border border-gray-600"
          placeholder="Enter new todo"
        />
        <button onClick={addTodo} className="px-4 py-2 bg-gray-700 text-white">
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map(function (todo) {
          return (
            <div key={todo._id} className="flex gap-3 items-center">
              {editId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={function (e) {
                      setEditText(e.target.value);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-600"
                  />
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 bg-blue-950 text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-600 text-white"
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
                    className="flex-1 px-3 py-2 border border-gray-600 bg-gray-100 text-gray-700"
                  />
                  <button
                    onClick={function () {
                      deleteTodo(todo._id);
                    }}
                    className="px-3 py-1 bg-teal-700 text-white"
                  >
                    Delete
                  </button>
                  <button
                    onClick={function () {
                      startEdit(todo._id, todo.text);
                    }}
                    className="px-3 py-1 bg-teal-900 text-white"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
