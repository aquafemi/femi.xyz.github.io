import React from 'react';

function DesktopIcons({ openWindow }) {
  return (
    <div className="desktop-icons">
      <div className="desktop-icon" onClick={() => openWindow('home', 'Home', 'https://i.imgur.com/O5M1z2p.png')}>
        <img src="https://i.imgur.com/O5M1z2p.png" alt="Home" />
        <span>Home</span>
      </div>
      <div className="desktop-icon" onClick={() => openWindow('about', 'About Me', 'https://i.imgur.com/jS1lQxV.png')}>
        <img src="https://i.imgur.com/jS1lQxV.png" alt="About" />
        <span>About Me</span>
      </div>
      <div className="desktop-icon" onClick={() => openWindow('contact', 'Contact', 'https://i.imgur.com/d1iHG1e.png')}>
        <img src="https://i.imgur.com/d1iHG1e.png" alt="Contact" />
        <span>Contact</span>
      </div>
    </div>
  );
}

export default DesktopIcons;