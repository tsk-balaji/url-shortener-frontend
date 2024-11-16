// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

const ShortenUrlForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleShorten = async () => {
    if (!originalUrl) {
      setError("Please enter a URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setIsCopied(false);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://url-shortener-backend-us50.onrender.com/create",
        { originalUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error creating short URL:", error);
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset "Copied" after 2 seconds
  };

  const handleReset = () => {
    setOriginalUrl("");
    setShortUrl("");
    setError("");
    setIsCopied(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-5 shadow-lg"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h2 className="text-center mb-4 text-primary">URL Shortener</h2>
        {!shortUrl ? (
          <>
            <div className="mb-4">
              <label htmlFor="originalUrl" className="form-label fw-bold">
                Enter your long URL
              </label>
              <input
                type="url"
                id="originalUrl"
                className="form-control form-control-lg"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              className="btn btn-primary btn-lg w-100 mb-3"
              onClick={handleShorten}
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              {isLoading ? "Shortening..." : "Shorten the URL"}
            </button>
          </>
        ) : (
          <div className="mt-4 p-4 bg-light rounded shadow-sm">
            <p className="fw-bold mb-3">Your shortened URL:</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                value={shortUrl}
                readOnly
              />
              <button
                className={`btn btn-${
                  isCopied ? "success" : "outline-secondary"
                }`}
                type="button"
                onClick={handleCopy}
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-link mt-3 text-primary"
            >
              Open in new tab
            </a>
            <button
              className="btn btn-secondary btn-lg w-100 mt-3"
              onClick={handleReset}
            >
              Shorten Another URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenUrlForm;
