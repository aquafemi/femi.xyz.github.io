import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import DesktopIcons from './components/DesktopIcons';

function App() {
  const location = useLocation();
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [windowStates, setWindowStates] = useState({
    '/': { isMinimized: false, isMaximized: false },
    '/about': { isMinimized: false, isMaximized: false },
    '/contact': { isMinimized: false, isMaximized: false }
  });

  // Window management functions
  const handleMinimize = (path, title, icon) => {
    // Add window to minimized windows if not already there
    if (!minimizedWindows.some(window => window.path === path)) {
      setMinimizedWindows([...minimizedWindows, { 
        id: Math.random().toString(36).substring(7),
        path, 
        title, 
        icon 
      }]);
    }
    
    // Update window state
    setWindowStates(prev => ({
      ...prev,
      [path]: { 
        ...prev[path],
        isMinimized: true 
      }
    }));
  };

  const handleMaximize = (path, isMaximized) => {
    setWindowStates(prev => ({
      ...prev,
      [path]: { 
        ...prev[path],
        isMaximized
      }
    }));
  };

  const handleClose = (path) => {
    // Remove from minimized windows
    setMinimizedWindows(minimizedWindows.filter(window => window.path !== path));
    
    // Update window state
    setWindowStates(prev => ({
      ...prev,
      [path]: { 
        isMinimized: false,
        isMaximized: false 
      }
    }));
  };

  const handleRestoreWindow = (id) => {
    const window = minimizedWindows.find(window => window.id === id);
    if (window) {
      // Update window state to not minimized
      setWindowStates(prev => ({
        ...prev,
        [window.path]: { 
          ...prev[window.path],
          isMinimized: false 
        }
      }));
      
      // Remove from minimized windows list
      setMinimizedWindows(minimizedWindows.filter(window => window.id !== id));
    }
  };

  useEffect(() => {
    // Reset minimized state when navigating to a new route
    const currentPath = location.pathname;
    setWindowStates(prev => ({
      ...prev,
      [currentPath]: { 
        ...prev[currentPath],
        isMinimized: false 
      }
    }));
  }, [location.pathname]);

  return (
    <div className="App">
      <DesktopIcons />
      
      <Routes>
        <Route path="/" element={
          <Home 
            isMinimized={windowStates['/'].isMinimized}
            isMaximized={windowStates['/'].isMaximized}
            onMinimize={() => handleMinimize('/', 'Home', 'https://i.imgur.com/O5M1z2p.png')}
            onMaximize={(isMax) => handleMaximize('/', isMax)}
            onClose={() => handleClose('/')}
          />
        } />
        <Route path="/about" element={
          <About 
            isMinimized={windowStates['/about'].isMinimized}
            isMaximized={windowStates['/about'].isMaximized}
            onMinimize={() => handleMinimize('/about', 'About Me', 'https://i.imgur.com/jS1lQxV.png')}
            onMaximize={(isMax) => handleMaximize('/about', isMax)}
            onClose={() => handleClose('/about')}
          />
        } />
        <Route path="/contact" element={
          <Contact 
            isMinimized={windowStates['/contact'].isMinimized}
            isMaximized={windowStates['/contact'].isMaximized}
            onMinimize={() => handleMinimize('/contact', 'Contact', 'https://i.imgur.com/d1iHG1e.png')}
            onMaximize={(isMax) => handleMaximize('/contact', isMax)}
            onClose={() => handleClose('/contact')}
          />
        } />
      </Routes>
      
      <Navbar 
        minimizedWindows={minimizedWindows} 
        handleRestoreWindow={handleRestoreWindow}
      />
    </div>
  );
}

export default App;