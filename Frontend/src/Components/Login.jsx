import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null); // Store the userId

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      navigate("/Profile");  // Redirect to profile page if already logged in
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('https://art-gallery-backend-dl89.onrender.com/login', {
        email: formData.email,
        password: formData.password
      })
      .then(result => {
        if(result.data.userId) {
          setUserId(result.data.userId);  // Set the userId after successful login
          localStorage.setItem("userId", result.data.userId); // Store it in localStorage
          navigate("/Profile");  // Redirect to profile page after successful login
        } else {
          setError(result.data); // Show error message if login fails
        }
      })
      .catch(error => setError("Invalid credentials. Please try again."));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>Login</button>
      </form>

      <p style={styles.noAccount}>
        Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign up here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ecf0f1",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    color: "#2c3e50",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",  // Ensure the input fills the available space
    boxSizing: "border-box",  // Include padding in the width calculation
  },
  submitButton: {
    padding: "10px 15px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "15px",
  },
  noAccount: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  },
  signupLink: {
    color: "#2c3e50",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
