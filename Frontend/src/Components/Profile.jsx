import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    bio: "",
    avatar: "",
    artworks: [],
  });
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }

    // Fetch user profile data along with artworks
    axios
      .get(`http://localhost:5000/profile/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching profile:", err);
      });
  }, [userId, navigate]);

  // Function to handle upload button click and navigate to /upload page
  const handleUploadClick = () => {
    navigate("/upload");
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove userId from localStorage
    navigate("/login"); // Navigate back to the login page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={styles.userInfo}>
            <h3>{userData.username}</h3>
            <p>{userData.email}</p>
            <p>{userData.bio}</p>
            {userData.avatar && (
              <img
                src={`http://localhost:5000/${userData.avatar}`}
                alt="Avatar"
                style={styles.avatar}
              />
            )}
          </div>

          {/* Upload Button */}
          <div style={styles.uploadButtonContainer}>
            <button
              style={styles.uploadButton}
              onClick={handleUploadClick} // Add onClick event to handle navigation
            >
              Upload Artwork
            </button>
          </div>

          <div style={styles.artworks}>
            <h3>Artworks</h3>
            {userData.artworks.length === 0 ? (
              <p>No artworks uploaded yet.</p>
            ) : (
              <div style={styles.artworkList}>
                {userData.artworks.map((artwork) => (
                  <div key={artwork._id} style={styles.artworkCard}>
                    <img
                      src={`http://localhost:5000/${artwork.imageUrl}`}
                      alt={artwork.name}
                      style={styles.artworkImage}
                    />
                    <h4 style={styles.cardTitle}>{artwork.name}</h4>
                    <p style={styles.cardDescription}>{artwork.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div style={styles.logoutButtonContainer}>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
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
  userInfo: {
    textAlign: "center",
  },
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginTop: "10px",
  },
  uploadButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  uploadButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  uploadButtonHover: {
    backgroundColor: "#2980b9",
  },
  artworks: {
    marginTop: "30px",
  },
  artworkList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  artworkCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  artworkImage: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "5px",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#333",
  },
  cardDescription: {
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "5px",
  },
  logoutButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  logoutButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Profile;
