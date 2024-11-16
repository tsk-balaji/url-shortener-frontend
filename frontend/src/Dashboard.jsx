// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import UrlStats from "./UrlStats";

const Dashboard = () => {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">URL Shortener Dashboard</h1>
      <UrlStats />
      <Link
        to="/shortenUrl"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "20px",
          color: "#007bff",
          textDecoration: "none",
          padding: "12px 24px",
          backgroundColor: "#f8f9fa",
          borderRadius: "6px",
          border: "2px solid #007bff",
          fontWeight: "600",
          transition: "all 0.3s ease",
          hover: {
            backgroundColor: "#007bff",
            color: "#fff",
          },
        }}
      >
        Shorten your URL now ⚡
      </Link>
    </div>
  );
};

export default Dashboard;
