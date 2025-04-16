import React, { useState } from 'react';
import DraggableWindow from '../components/DraggableWindow';
import { useNavigate } from 'react-router-dom';

function About({ isMinimized, isMaximized, onMinimize, onMaximize, onClose }) {
  const navigate = useNavigate();

  if (isMinimized) {
    return null;
  }

  return (
    <DraggableWindow 
      title="About Me - My Portfolio" 
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      defaultPosition={{ x: '25%', y: '15%' }}
    >
      <div className="window-body">
        <div className="content">
          <h1>About Me</h1>
          <div className="field-row-stacked" style={{ width: '100%' }}>
            <p>I am a web developer with experience in React, Node.js, and other modern web technologies.</p>
            <p>My skills include:</p>
            <ul className="tree-view" style={{ height: 'auto', width: '100%' }}>
              <li>Frontend Development: React, Vue.js</li>
              <li>Backend Development: Node.js, Express</li>
              <li>Database: MongoDB, PostgreSQL</li>
              <li>Other: Git, Docker, AWS</li>
            </ul>
            <p>When I'm not coding, I enjoy hiking, reading, and playing video games.</p>
          </div>
          <div className="field-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/contact')}>Contact</button>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <div className="status-bar-field">Press F1 for help</div>
        <div className="status-bar-field">CPU Usage: 22%</div>
        <div className="status-bar-field">My Documents</div>
      </div>
    </DraggableWindow>
  );
}

export default About;
