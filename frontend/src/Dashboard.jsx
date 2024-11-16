// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(
          "https://url-shortener-backend-us50.onrender.com/stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUrls(response.data.urls);
      } catch (error) {
        console.error("Fetch URLs error:", error);
        // navigate("/"); // Redirect to login if not authenticated
      }
    };
    fetchUrls();
  }, [navigate]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Your Shortened URLs
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {urls.length === 0 ? (
          <p className="text-gray-600">
            No URLs found. Create your first shortened URL!
          </p>
        ) : (
          <ul className="space-y-4">
            {urls.map((url) => (
              <li key={url._id} className="border-b border-gray-200 pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {url.shortUrl}
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      Original: {url.originalUrl}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(url.shortUrl)
                      }
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm"
                    >
                      Copy URL
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
