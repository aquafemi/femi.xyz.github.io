import React, { useState } from 'react';
import logo from '../logo.svg';
import DraggableWindow from '../components/DraggableWindow';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [showWindow, setShowWindow] = useState(true);

  const handleClose = () => {
    setShowWindow(false);
  };

  if (!showWindow) {
    return null;
  }

  return (
    <DraggableWindow 
      title="Home - My Portfolio" 
      onClose={handleClose}
      defaultPosition={{ x: '15%', y: '10%' }}
    >
      <div className="window-body">
        <div className="content">
          <img src={logo} className="App-logo" alt="logo" style={{ width: '100px', height: '100px' }} />
          <h1>Welcome to My Portfolio</h1>
          <p>Hi, I'm a web developer. This portfolio is styled like Windows XP.</p>
          <p>Click on the desktop icons to navigate through the site.</p>
          <div className="field-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => navigate('/about')}>About Me</button>
            <button onClick={() => navigate('/contact')}>Contact</button>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <div className="status-bar-field">Press F1 for help</div>
        <div className="status-bar-field">CPU Usage: 14%</div>
        <div className="status-bar-field">My Documents</div>
      </div>
    </DraggableWindow>
  );
}

export default Home;
