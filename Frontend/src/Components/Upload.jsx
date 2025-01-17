import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(""); // State for artist's name
  const [description, setDescription] = useState(""); // State for description
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId"); // Get the userId from localStorage
  const navigate = useNavigate(); // Use navigate to redirect

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || !name || !description) {
      setMessage("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", userId); // Send the userId with the upload request
    formData.append("name", name); // Send artist's name
    formData.append("description", description); // Send description

    try {
      const response = await axios.post("https://art-gallery-backend-dl89.onrender.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Image upload failed. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/Gallary"); // Redirect to gallery when cancel button is clicked
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload Your Artwork</h2>
      <form onSubmit={handleUpload} style={styles.form}>
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Artist's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description of Artwork"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Upload
        </button>
        <button type="button" onClick={handleCancel} style={styles.cancelButton}>
          Cancel
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    height: "100px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    color: "green",
  },
};

export default Upload;
