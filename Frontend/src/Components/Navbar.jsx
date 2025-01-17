import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>KalaKosha </Link>
      </div>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/Gallary" style={styles.navItem}>Explore Gallery</Link>
        </li>
        <li>
          <Link to="/login" style={styles.navItem}>Login</Link>
        </li>
        <li>
          <Link to="/signup" style={styles.navItem}>Signup</Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#2c3e50",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ecf0f1",
  },
  logoLink: {
    textDecoration: "none",
    color: "#ecf0f1",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  navItem: {
    fontSize: "16px",
    textDecoration: "none",
    color: "#ecf0f1",
    padding: "5px 10px",
    transition: "background-color 0.3s, color 0.3s",
    borderRadius: "5px",
  },
  navItemHover: {
    backgroundColor: "#34495e",
    color: "#ffffff",
  },
};

// Add hover effect with inline styles dynamically
document.addEventListener("mouseover", (e) => {
  if (e.target.style && e.target.style.transition) {
    e.target.style.backgroundColor = "#34495e";
    e.target.style.color = "#ffffff";
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.style && e.target.style.transition) {
    e.target.style.backgroundColor = "transparent";
    e.target.style.color = "#ecf0f1";
  }
});
