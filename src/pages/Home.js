import React from 'react';
import logo from '../logo.svg';

function Home() {
  return (
    <div className="window" style={{ width: '70%', margin: '40px auto' }}>
      <div className="title-bar">
        <div className="title-bar-text">Home - My Portfolio</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div className="content">
          <img src={logo} className="App-logo" alt="logo" style={{ width: '100px', height: '100px' }} />
          <h1>Welcome to My Portfolio</h1>
          <p>Hi, I'm a web developer. This portfolio is styled like Windows XP.</p>
          <p>Click on the desktop icons to navigate through the site.</p>
          <div className="field-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => window.location.href = '/about'}>About Me</button>
            <button onClick={() => window.location.href = '/contact'}>Contact</button>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <div className="status-bar-field">Press F1 for help</div>
        <div className="status-bar-field">CPU Usage: 14%</div>
        <div className="status-bar-field">My Documents</div>
      </div>
    </div>
  );
}

export default Home;
