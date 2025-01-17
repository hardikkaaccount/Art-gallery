import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Gallary = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");
        setImages(response.data);
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handleUploadClick = () => {
    navigate("/upload"); // Navigate to /Upload on button click
  };

  return (
    <div style={styles.galleryContainer}>
      <h2 style={styles.galleryTitle}>Gallery</h2>

      {/* Upload Button */}
      <button onClick={handleUploadClick} style={styles.uploadButton}>
        Upload My Artwork
      </button>

      <div style={styles.imageGrid}>
        {images.map((image) => (
          <div
            key={image._id}
            style={styles.card}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={`http://localhost:5000/${image.imageUrl}`}
              alt={image.name}
              style={styles.image}
            />
            <p style={styles.cardTitle}>{image.name}</p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <div style={styles.popupLeft}>
              <img
                src={`http://localhost:5000/${selectedImage.imageUrl}`}
                alt={selectedImage.name}
                style={styles.popupImage}
              />
            </div>
            <div style={styles.popupRight}>
              <h3>Artist: {selectedImage.name}</h3>
              <p>{selectedImage.description}</p>
              <button onClick={handleClosePopup} style={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  galleryContainer: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  galleryTitle: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  uploadButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "1rem",
    marginBottom: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    padding: "10px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardTitle: {
    padding: "10px",
    fontSize: "1rem",
    color: "#333",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain", // Ensures the entire image fits without cropping
  },
  popupOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    display: "flex",
    flexDirection: "column", // Ensure vertical layout for image and description
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "800px",
    width: "80%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  popupLeft: {
    flex: "1",
    paddingRight: "20px",
    display: "flex", 
    justifyContent: "center", // Center the image in the popup
  },
  popupRight: {
    flex: "1",
    paddingLeft: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Align the text properly next to the image
  },
  popupImage: {
    width: "100%",
    height: "auto", // Maintain aspect ratio
    maxHeight: "500px", // Limit the maximum height
    objectFit: "contain", // Ensure the whole image fits
    borderRadius: "8px",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Gallary;
