import React, { useState } from 'react';
import DraggableWindow from '../components/DraggableWindow';
import { useNavigate } from 'react-router-dom';

function Contact({ isMinimized, isMaximized, zIndex, onMinimize, onMaximize, onClose, onFocus }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message received!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  if (isMinimized) {
    return null;
  }

  return (
    <DraggableWindow 
      title="Contact Me - My Portfolio" 
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      defaultPosition={{ x: '30%', y: '20%' }}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="window-body">
        <div className="content">
          <h1>Contact Me</h1>
          <p>Fill out this form to get in touch:</p>
          <form onSubmit={handleSubmit}>
            <div className="field-row-stacked" style={{ width: '100%' }}>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-row-stacked" style={{ width: '100%' }}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-row-stacked" style={{ width: '100%' }}>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="8"
                value={formData.message}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              ></textarea>
            </div>
            <div className="field-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <button type="submit">Send Message</button>
              <button type="button" onClick={() => navigate('/')}>Back to Home</button>
            </div>
          </form>
        </div>
      </div>
      <div className="status-bar">
        <div className="status-bar-field">Press F1 for help</div>
        <div className="status-bar-field">CPU Usage: 18%</div>
        <div className="status-bar-field">My Documents</div>
      </div>
    </DraggableWindow>
  );
}

export default Contact;
