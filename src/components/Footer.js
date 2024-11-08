import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Footer.css'; // Import CSS for footer styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
    
        {/* Social Media Links */}
        <div className="footer-links">
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f" style={{ fontSize: '30px' }}></i> {/* Facebook icon */}
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              {/* Updated Twitter X logo using SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="twitter-x-icon">
                <path d="M3 6l18 18M21 6l-18 18"></path>
              </svg> {/* Twitter X icon */}
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram" style={{ fontSize: '30px' }}></i> {/* Instagram icon */}
            </a>
          </div>

          {/* Quick Links Section */}
          <div className="quick-links">
            <Link to="/terms">Terms and Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>

        {/* Footer Bottom with company name */}
        <div className="footer-bottom">
          <p>&copy; 2024 ElectroHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
