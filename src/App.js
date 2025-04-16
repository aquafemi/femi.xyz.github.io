import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import DesktopIcons from './components/DesktopIcons';

function App() {
  const [activeWindows, setActiveWindows] = useState({
    home: { isOpen: true, isMinimized: false, isMaximized: false, zIndex: 1, order: 0 },
    about: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, order: -1 },
    contact: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, order: -1 }
  });
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [windowOrder, setWindowOrder] = useState(1);

  // Window management functions
  const bringToFront = (windowKey) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    
    setActiveWindows(prev => ({
      ...prev,
      [windowKey]: {
        ...prev[windowKey],
        zIndex: newZIndex
      }
    }));
  };

  const handleOpen = (windowKey, title, icon) => {
    bringToFront(windowKey);
    
    // Assign next order number only if window is not already open
    const newOrder = !activeWindows[windowKey].isOpen ? windowOrder : activeWindows[windowKey].order;
    if (!activeWindows[windowKey].isOpen) {
      setWindowOrder(prev => prev + 1);
    }
    
    setActiveWindows(prev => ({
      ...prev,
      [windowKey]: {
        ...prev[windowKey],
        isOpen: true,
        isMinimized: false,
        order: newOrder
      }
    }));
  };

  const handleMinimize = (windowKey, title, icon) => {
    // Add window to minimized windows if not already there
    if (!minimizedWindows.some(window => window.key === windowKey)) {
      setMinimizedWindows([...minimizedWindows, { 
        id: Math.random().toString(36).substring(7),
        key: windowKey, 
        title, 
        icon,
        order: activeWindows[windowKey].order // Preserve order for sorting
      }]);
    }
    
    // Update window state
    setActiveWindows(prev => ({
      ...prev,
      [windowKey]: { 
        ...prev[windowKey],
        isMinimized: true 
      }
    }));
  };

  const handleMaximize = (windowKey, isMaximized) => {
    setActiveWindows(prev => ({
      ...prev,
      [windowKey]: { 
        ...prev[windowKey],
        isMaximized
      }
    }));
  };

  const handleClose = (windowKey) => {
    // Remove from minimized windows
    setMinimizedWindows(minimizedWindows.filter(window => window.key !== windowKey));
    
    // Update window state
    setActiveWindows(prev => ({
      ...prev,
      [windowKey]: { 
        ...prev[windowKey],
        isOpen: false,
        isMinimized: false,
        isMaximized: false 
      }
    }));
  };

  const handleRestoreWindow = (id) => {
    const window = minimizedWindows.find(window => window.id === id);
    if (window) {
      bringToFront(window.key);
      
      // Update window state to not minimized
      setActiveWindows(prev => ({
        ...prev,
        [window.key]: { 
          ...prev[window.key],
          isMinimized: false 
        }
      }));
      
      // Remove from minimized windows list
      setMinimizedWindows(minimizedWindows.filter(window => window.id !== id));
    }
  };

  // Create a list of all taskbar items (open and minimized windows)
  const getTaskbarItems = () => {
    const items = [];
    
    // Add all open, non-minimized windows
    Object.entries(activeWindows).forEach(([key, window]) => {
      if (window.isOpen && !window.isMinimized) {
        const title = key === 'home' ? 'Home' : 
                    key === 'about' ? 'About Me' : 
                    key === 'contact' ? 'Contact' : key;
                    
        const icon = key === 'home' ? 'https://i.imgur.com/O5M1z2p.png' : 
                    key === 'about' ? 'https://i.imgur.com/jS1lQxV.png' : 
                    key === 'contact' ? 'https://i.imgur.com/d1iHG1e.png' : '';
        
        items.push({
          id: key,
          key,
          title,
          icon,
          isMinimized: false,
          order: window.order
        });
      }
    });
    
    // Add all minimized windows
    minimizedWindows.forEach(window => {
      items.push({
        ...window,
        isMinimized: true
      });
    });
    
    // Sort items by their order (when they were opened)
    // Lower orders (older windows) come first
    return items.sort((a, b) => a.order - b.order);
  };

  return (
    <div className="App">
      <DesktopIcons openWindow={handleOpen} />
      
      {activeWindows.home.isOpen && (
        <Home 
          isMinimized={activeWindows.home.isMinimized}
          isMaximized={activeWindows.home.isMaximized}
          zIndex={activeWindows.home.zIndex}
          onMinimize={() => handleMinimize('home', 'Home', 'https://i.imgur.com/O5M1z2p.png')}
          onMaximize={(isMax) => handleMaximize('home', isMax)}
          onClose={() => handleClose('home')}
          onFocus={() => bringToFront('home')}
        />
      )}
      
      {activeWindows.about.isOpen && (
        <About 
          isMinimized={activeWindows.about.isMinimized}
          isMaximized={activeWindows.about.isMaximized}
          zIndex={activeWindows.about.zIndex}
          onMinimize={() => handleMinimize('about', 'About Me', 'https://i.imgur.com/jS1lQxV.png')}
          onMaximize={(isMax) => handleMaximize('about', isMax)}
          onClose={() => handleClose('about')}
          onFocus={() => bringToFront('about')}
        />
      )}
      
      {activeWindows.contact.isOpen && (
        <Contact 
          isMinimized={activeWindows.contact.isMinimized}
          isMaximized={activeWindows.contact.isMaximized}
          zIndex={activeWindows.contact.zIndex}
          onMinimize={() => handleMinimize('contact', 'Contact', 'https://i.imgur.com/d1iHG1e.png')}
          onMaximize={(isMax) => handleMaximize('contact', isMax)}
          onClose={() => handleClose('contact')}
          onFocus={() => bringToFront('contact')}
        />
      )}
      
      <Navbar 
        taskbarItems={getTaskbarItems()}
        handleRestoreWindow={handleRestoreWindow}
        openWindow={handleOpen}
        bringToFront={bringToFront}
      />
    </div>
  );
}

export default App;