import React, { useState } from 'react';

function Contact() {
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

  return (
    <div className="window" style={{ width: '70%', margin: '40px auto' }}>
      <div className="title-bar">
        <div className="title-bar-text">Contact Me - My Portfolio</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
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
              <button type="button" onClick={() => window.location.href = '/'}>Back to Home</button>
            </div>
          </form>
        </div>
      </div>
      <div className="status-bar">
        <div className="status-bar-field">Press F1 for help</div>
        <div className="status-bar-field">CPU Usage: 18%</div>
        <div className="status-bar-field">My Documents</div>
      </div>
    </div>
  );
}

export default Contact;
