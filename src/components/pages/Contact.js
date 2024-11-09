import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      {/* Email section */}
      <p className="contact-info">
        For inquiries, reach us at{' '}
        <a href="mailto:contact@electrohub.com">contact@electrohub.com</a>
      </p>

      {/* Phone and WhatsApp section */}
      <p className="contact-info">
        <i className="fas fa-phone-alt"></i> Phone: Call us at{' '}
        <a href="tel:+0746890567"><strong>0746 890 567</strong></a>.
      </p>
      <p className="contact-info">
        <i className="fab fa-whatsapp"></i> WhatsApp: Reach us on{' '}
        <a href="https://wa.me/0724856856" target="_blank" rel="noopener noreferrer">
          0724 856 856
        </a>{' '}
        or{' '}
        <a href="https://wa.me/0726144344" target="_blank" rel="noopener noreferrer">
          0726 144 344
        </a>.
      </p>

      <h2 className="social-media-title">Follow Us On</h2>
      <div className="social-media-icons">
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
