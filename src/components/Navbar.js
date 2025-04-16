import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="taskbar">
      <div className="start-button">
        <img src="https://i.imgur.com/vzBDKyA.png" alt="Start" />
        <span>Start</span>
      </div>
      <div className="time">{time}</div>
    </div>
  );
}

export default Navbar;