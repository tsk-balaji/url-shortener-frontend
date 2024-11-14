// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://url-shortener-backend-us50.onrender.com/api/auth/forgot-password",
        { username: email }
      );
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Request failed");
      setMessage("");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body">
          <h2 className="text-center text-primary">Forgot Password?</h2>
          <p className="text-center text-muted">
            Don’t worry! Enter your email, and we’ll send you a reset link.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Reset Link
            </button>
          </form>
          {message && (
            <div className="alert alert-success mt-3 text-center" role="alert">
              {message}
            </div>
          )}
          {error && (
            <div className="alert alert-danger mt-3 text-center" role="alert">
              {error}
            </div>
          )}
          <div className="text-center mt-4">
            <Link to="/login" className="text-decoration-none text-primary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
