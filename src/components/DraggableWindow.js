import React, { useState, useRef, useEffect } from 'react';

function DraggableWindow({ title, children, onClose, defaultPosition = { x: '15%', y: '15%' }, width = '70%' }) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    // Only allow dragging from the title bar
    if (e.target.closest('.title-bar')) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - windowRef.current.getBoundingClientRect().left,
        y: e.clientY - windowRef.current.getBoundingClientRect().top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      // Keep window within viewport bounds
      const windowWidth = windowRef.current.offsetWidth;
      const windowHeight = windowRef.current.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const boundedX = Math.max(0, Math.min(newX, viewportWidth - windowWidth));
      const boundedY = Math.max(0, Math.min(newY, viewportHeight - windowHeight - 40)); // 40px for taskbar

      setPosition({
        x: boundedX + 'px',
        y: boundedY + 'px'
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="window" 
      ref={windowRef}
      style={{ 
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: width,
        margin: 0,
        zIndex: isDragging ? 1000 : 1,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="title-bar" style={{ cursor: 'grab' }}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default DraggableWindow;