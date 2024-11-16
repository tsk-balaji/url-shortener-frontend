// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const UrlStats = () => {
  const [dailyStats, setDailyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://url-shortener-backend-us50.onrender.com/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDailyStats(response.data.dailyStats);
        setMonthlyStats(response.data.monthlyStats);
      } catch (error) {
        console.error("Error fetching URL stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container">
      <div className="row g-4">
        {/* Daily Stats Card */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body p-4">
              <h3 className="text-primary mb-4">
                <i className="fas fa-calendar-day me-2"></i>
                Daily Statistics
              </h3>
              {dailyStats.length === 0 ? (
                <div className="alert alert-info">
                  No daily statistics available yet.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th
                          scope="col"
                          className="text-center"
                          style={{
                            width: "60%",
                            textAlign: "center",
                            alignContent: "center",
                          }}
                        >
                          Date
                        </th>
                        <th scope="col" className="text-center">
                          Number of URLs
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyStats.map((stat) => (
                        <tr key={stat._id}>
                          <td className="text-center">
                            {new Date(stat._id)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })
                              .split("/")
                              .join("-")}
                          </td>
                          <td className="text-center">
                            <span className="badge bg-primary rounded-pill">
                              {stat.totalUrls}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Stats Card */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body p-4">
              <h3 className="text-primary mb-4">
                <i className="fas fa-calendar-alt me-2"></i>
                Monthly Statistics
              </h3>
              {monthlyStats.length === 0 ? (
                <div className="alert alert-info">
                  No monthly statistics available yet.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="text-center">
                          Month
                        </th>
                        <th scope="col" className="text-center">
                          Number of URLs
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyStats.map((stat) => (
                        <tr key={stat._id}>
                          <td className="text-center">
                            {new Date(stat._id + "-01")
                              .toLocaleString("en-US", {
                                month: "short",
                                year: "2-digit",
                              })
                              .toUpperCase()}
                          </td>
                          <td className="text-center">
                            <span className="badge bg-primary rounded-pill">
                              {stat.totalUrls}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlStats;
