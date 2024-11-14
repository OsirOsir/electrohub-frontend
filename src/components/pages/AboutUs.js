import React from 'react';
import './AboutUs.css'; 

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      
      
      <p className="about-us-description">
        ElectroHub was founded in 2020 with the mission to revolutionize the tech industry by providing cutting-edge electronic solutions. 
        We aim to create a seamless experience for both businesses and individuals, empowering them with the best products and services. 
        Our innovative approach and commitment to quality have helped us become a trusted name in the industry.
      </p>
      
    
      <h2 className="achievements-title">What Makes Us Stand Out</h2>
      <ul className="achievements-list">
        <li><strong>Innovation:</strong> Constantly striving to push the boundaries of technology with innovative products.</li>
        <li><strong>Customer Satisfaction:</strong> We prioritize customer needs and provide personalized services to ensure satisfaction.</li>
        <li><strong>Global Reach:</strong> Serving clients around the world with reliable tech solutions.</li>
        <li><strong>Expert Team:</strong> Our team consists of highly skilled professionals who are experts in the tech industry.</li>
      </ul>
      
      
      <h2 className="follow-us-title">Follow Us On</h2>

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

export default AboutUs;
