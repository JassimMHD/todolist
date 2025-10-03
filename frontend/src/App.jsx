import "./index.css";
import TodoList from "./components/TodoList";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return (
      <div>
        {showSignup ? (
          <Signup onSignup={() => setShowSignup(false)} />
        ) : (
          <Login onLogin={setToken} />
        )}
        <button
          className="w-full text-black-500 py-2 cursor-pointer"
          onClick={() => setShowSignup(!showSignup)}
        >
          {showSignup ? "Already have an account? Login" : "Create account"}
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <button
        onClick={handleLogout}
        className="absolute top-4 left-4 bg-gray-400 text-white px-4 py-2 cursor-pointer"
      >
        Logout
      </button>

      <div className="pt-16 px-4">
        <TodoList token={token} />
      </div>
    </div>
  );
}

export default App;
