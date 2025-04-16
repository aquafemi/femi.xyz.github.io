import React, { useState, useEffect } from 'react';

function Navbar({ minimizedWindows, handleRestoreWindow, openWindow }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const handleStartMenuItemClick = (windowKey, title, icon) => {
    openWindow(windowKey, title, icon);
    setStartMenuOpen(false);
  };

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (startMenuOpen && !e.target.closest('.start-button') && !e.target.closest('.start-menu')) {
        setStartMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [startMenuOpen]);

  return (
    <>
      <div className="taskbar">
        <div className="start-button" onClick={toggleStartMenu}>
          <img src="https://i.imgur.com/vzBDKyA.png" alt="Start" />
          <span>Start</span>
        </div>
        
        <div className="taskbar-items">
          {minimizedWindows.map((window, index) => (
            <div 
              key={index} 
              className="taskbar-item"
              onClick={() => handleRestoreWindow(window.id)}
            >
              <img src={window.icon} alt={window.title} />
              <span>{window.title}</span>
            </div>
          ))}
        </div>
        
        <div className="time">{time}</div>
      </div>

      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-menu-header">
            <span>User</span>
          </div>
          <div className="start-menu-items">
            <div 
              className="start-menu-item" 
              onClick={() => handleStartMenuItemClick('home', 'Home', 'https://i.imgur.com/O5M1z2p.png')}
            >
              <img src="https://i.imgur.com/O5M1z2p.png" alt="Home" />
              <span>Home</span>
            </div>
            <div 
              className="start-menu-item" 
              onClick={() => handleStartMenuItemClick('about', 'About Me', 'https://i.imgur.com/jS1lQxV.png')}
            >
              <img src="https://i.imgur.com/jS1lQxV.png" alt="About" />
              <span>About Me</span>
            </div>
            <div 
              className="start-menu-item" 
              onClick={() => handleStartMenuItemClick('contact', 'Contact', 'https://i.imgur.com/d1iHG1e.png')}
            >
              <img src="https://i.imgur.com/d1iHG1e.png" alt="Contact" />
              <span>Contact</span>
            </div>
            <div className="start-menu-divider"></div>
            <div className="start-menu-item">
              <img src="https://i.imgur.com/wGFChHk.png" alt="Power" />
              <span>Shut Down</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;