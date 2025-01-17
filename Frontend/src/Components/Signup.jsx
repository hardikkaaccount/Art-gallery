import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.username || !formData.password) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('https://art-gallery-backend-dl89.onrender.com/register', {
        email: formData.email,
        username: formData.username,
        password: formData.password
      })
      .then(result => {
        console.log(result);
        navigate("/login");  // Redirect to login page after successful registration
      })
      .catch(error => {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);  // Display error from backend
        } else {
          setError("An error occurred. Please try again.");
        }
      });
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign Up</h2>
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
          <label htmlFor="username" style={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
        <button type="submit" style={styles.submitButton}>Sign Up</button>
      </form>

      <p style={styles.alreadyRegistered}>
        Already registered? <Link to="/login" style={styles.loginLink}>Login here</Link>
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
  alreadyRegistered: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  },
  loginLink: {
    color: "#2c3e50",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
