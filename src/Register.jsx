// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [existingUser, setExistingUser] = useState(""); // New state for existing user email
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://url-shortener-backend-us50.onrender.com/api/auth/register",
        formData
      );
      alert(response.data.message); // Registration success message
      navigate("/"); // Redirect to login
    } catch (error) {
      console.log(error);
      // Improved error handling with more specific messages
      if (error.response?.status === 400) {
        setError("Please fill in all required fields correctly");
      } else if (error.response?.status === 409) {
        setError(
          "This email is already registered. Please use a different email."
        );
        setExistingUser(error.response?.data?.existingUser || ""); // Extract existing user's email
      } else if (!navigator.onLine) {
        setError("Please check your internet connection and try again");
      } else {
        setError("Registration failed. Please try again later.");
      }
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
        Register
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          name="username"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
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
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register
        </button>
        {error && (
          <p
            style={{
              color: "#dc3545",
              textAlign: "center",
              margin: "10px 0",
              padding: "10px",
              backgroundColor: "#f8d7da",
              borderRadius: "4px",
              border: "1px solid #f5c6cb",
            }}
          >
            {error}
            {existingUser && (
              <span style={{ display: "block", marginTop: "10px" }}>
                Already registered with this email: <b>{existingUser}</b>
              </span>
            )}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
