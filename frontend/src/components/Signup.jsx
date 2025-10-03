import React, { useState } from "react";

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.msg || "Signup failed");
      alert("Signup success. Please login.");
      onSignup();
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="w-80 p-6 mx-auto mt-20">
      <h2 className="text-2xl text-center mb-4">Signup</h2>
      <form onSubmit={submit}>
        <input
          className="w-full p-2 mb-3 border border-gray-300"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
        />

        <input
          className="w-full p-2 mb-3 border border-gray-300"
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
          required
        />

        <button className="w-full bg-gray-600 text-white py-2" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
