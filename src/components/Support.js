import React from 'react';
import { Link } from 'react-router-dom';
import './Support.css';

const Support = () => {
  return (
    <div className="support-container">
      <h1>Customer Support</h1>
      <div className="support-links">
        <Link to="/warranty" className="support-item">
          <div className="support-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <path fill="black" d="M12 0L2 4v16l10 4 10-4V4l-10-4zM12 18l-8-3v-6l8 3 8-3v6l-8 3z"/>
            </svg>
          </div>
          <h2>Warranty</h2>
          <p>Check local warranty policy protection</p>
        </Link>

    
        <Link to="/order-support" className="support-item">
          <div className="support-icon">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3000/3000345.png" 
              alt="Order Tracking"
              width="40"
              height="40"
            />
          </div>
          <h2>Order Support</h2>
          <p>Check order progress</p>
        </Link>
      </div>

      
      <p>
        Icons created by <a href="https://www.flaticon.com/authors/kp-arts" title="KP Arts">KP Arts</a> (Warranty) and 
        <a href="https://www.flaticon.com/authors/creatype" title="Creatype"> Creatype</a> (Order Tracking) - Flaticon
      </p>
    </div>
  );
};

export default Support;
