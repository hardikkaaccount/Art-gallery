import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to KalaKosha</h1>
          <p style={styles.heroSubtitle}>A Canvas for Creativity</p>
          <Link to="/Gallary" style={styles.exploreButton}>
            Explore Gallery
          </Link>
        </div>
        <div style={styles.heroImageContainer}>
          <img
            src="https://media.istockphoto.com/id/636761588/photo/used-brushes-on-an-artists-palette-of-colorful-oil-paint.jpg?s=612x612&w=0&k=20&c=38YQxVJVWnNfvGtlb7AXMx_ItyHZMEdmWenNkWNQ91g="
            alt="Artistic Display"
            style={styles.heroImage}
          />
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Showcase Your Masterpieces</h2>
        <p>
          Unleash your creativity and let your art shine. Upload your artwork
          effortlessly, create stunning portfolios, and share your unique vision
          with a global audience. Every artist deserves a spotlight, and KalaKosha
          ensures your work gets the recognition it deserves.
        </p>
        <img
          src="https://www.postergully.com/cdn/shop/products/2_2_d27a932d-0f43-4dce-9325-5ad60d67aedf.jpg?v=1578634005"
          alt="Showcase"
          style={styles.sectionImage}
        />
      </div>

      <div style={{ ...styles.section, backgroundColor: "#f9f9f9" }}>
        <h2 style={styles.sectionTitle}>Discover and Be Inspired</h2>
        <p>
          Explore an ever-growing collection of artwork from diverse creators
          around the world. From paintings to photography, digital illustrations
          to sculptures, find inspiration in every corner. Follow your favorite
          artists, engage with their work, and become part of a thriving artistic
          community.
        </p>
        <img
          src="https://media.istockphoto.com/id/1190200652/photo/the-painter-hands.jpg?s=612x612&w=0&k=20&c=ejXBjL330H0_i7O90UaRnMqP2G-ZQLgI4XBeXxweWss="
          alt="Discover"
          style={styles.sectionImage}
        />
      </div>

      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Join Us Today</h2>
        <p>
          Start your journey with KalaKosha today. Sign up, showcase your art, and
          inspire the world. Together, let's create a gallery without limits. Your
          masterpiece awaits its audience—why wait to make your mark?
        </p>
        <Link to="/signup" style={styles.ctaButton}>
          Get Started
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "40px",
    backgroundColor: "#ffefd5",
    borderBottom: "2px solid #f4a261",
    animation: "fadeIn 2s",
  },
  heroContent: {
    maxWidth: "50%",
  },
  heroTitle: {
    fontSize: "3rem",
    color: "#2a9d8f",
    marginBottom: "10px",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    color: "#264653",
    marginBottom: "20px",
  },
  exploreButton: {
    padding: "10px 20px",
    backgroundColor: "#2a9d8f",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "all 0.3s ease",
  },
  exploreButtonHover: {
    backgroundColor: "#21867a",
  },
  heroImageContainer: {
    maxWidth: "40%",
  },
  heroImage: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  section: {
    padding: "40px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "2rem",
    color: "#264653",
    marginBottom: "20px",
  },
  sectionDescription: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "20px",
  },
  sectionImage: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  ctaSection: {
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#264653",
    color: "white",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  ctaDescription: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  ctaButton: {
    padding: "10px 20px",
    backgroundColor: "#e76f51",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "1.2rem",
    transition: "all 0.3s ease",
  },
};
