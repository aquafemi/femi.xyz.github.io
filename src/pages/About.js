import React from 'react';

function About() {
  return (
    <div className="window" style={{ width: '70%', margin: '40px auto' }}>
      <div className="title-bar">
        <div className="title-bar-text">About Me - My Portfolio</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
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
            <button onClick={() => window.location.href = '/'}>Home</button>
            <button onClick={() => window.location.href = '/contact'}>Contact</button>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <div className="status-bar-field">Press F1 for help</div>
        <div className="status-bar-field">CPU Usage: 22%</div>
        <div className="status-bar-field">My Documents</div>
      </div>
    </div>
  );
}

export default About;
