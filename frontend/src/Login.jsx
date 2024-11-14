// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://url-shortener-backend-us50.onrender.com/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token); // Save token
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "30px",
        }}
      >
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <input
          name="username"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Login
        </button>
        {error && (
          <p style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
            {error}
          </p>
        )}
      </form>
      <Link
        to="/forgot-password"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "20px",
          color: "#007bff",
          textDecoration: "none",
        }}
      >
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
