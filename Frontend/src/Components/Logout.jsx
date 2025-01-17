import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* User icon (smaller circle with initials) */}
      <div
        style={styles.userLogo}
        onClick={() => navigate('/Profile')} // Navigate to /Profile on click
      >
        {'🙍‍♂️'} {/* Replace with dynamic initial if needed */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'inline-block',
  },
  userLogo: {
    width: '30px', // Icon size
    height: '30px', // Icon size
    borderRadius: '50%',
    backgroundColor: '#34495e',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px', // Initial size
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Logout;
