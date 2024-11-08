import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <p className="contact-info">
        For inquiries, reach us at <a href="mailto:contact@electrohub.com">contact@electrohub.com</a>
      </p>
      
      <h2 className="social-media-title">Follow Us On</h2>
      
      <div className="social-media-icons">
        {/* Using Font Awesome class names directly */}
        <a href="https://facebook.com/ElectroHub" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com/ElectroHub" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com/ElectroHub" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com/company/ElectroHub" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default Contact;
