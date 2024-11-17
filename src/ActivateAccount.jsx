// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const ActivateAccount = () => {
  const { token } = useParams(); // Get token from the URL
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(
          `https://url-shortener-backend-us50.onrender.com/api/auth/activate/${token}`
        );
        setMessage(response.data.message);
        setLoading(false);
        // Redirect to login page after successful activation
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      } catch (error) {
        setMessage(error.response?.data?.message || "Error activating account");
        setLoading(false);
      }
    };

    if (token) {
      activateAccount();
    }
  }, [token, history]);

  return (
    <div className="container">
      <div className="alert alert-info mt-5" role="alert">
        {loading ? <p>Activating your account...</p> : <p>{message}</p>}
      </div>
    </div>
  );
};

export default ActivateAccount;
