import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DesktopIcons() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to reopen windows that have been closed
  const handleIconClick = (path) => {
    // Only navigate if we're not already on this page
    // This forces a component remount to reopen the window
    if (location.pathname === path) {
      navigate('/', { replace: true });
      setTimeout(() => navigate(path, { replace: true }), 10);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="desktop-icons">
      <div className="desktop-icon" onClick={() => handleIconClick('/')}>
        <img src="https://i.imgur.com/O5M1z2p.png" alt="Home" />
        <span>Home</span>
      </div>
      <div className="desktop-icon" onClick={() => handleIconClick('/about')}>
        <img src="https://i.imgur.com/jS1lQxV.png" alt="About" />
        <span>About Me</span>
      </div>
      <div className="desktop-icon" onClick={() => handleIconClick('/contact')}>
        <img src="https://i.imgur.com/d1iHG1e.png" alt="Contact" />
        <span>Contact</span>
      </div>
    </div>
  );
}

export default DesktopIcons;