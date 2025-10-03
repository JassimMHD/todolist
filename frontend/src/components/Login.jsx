import { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className=" w-80 p-6 mx-auto mt-20 ">
      <h2 className="text-2xl  text-center mb-4">Login</h2>
      <input
        className="w-full p-2 mb-3 border border-gray-300 "
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 mb-4 border border-gray-300"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-gray-600 text-white py-2  cursor-pointer"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
