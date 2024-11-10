import React from 'react';
import './CredibilitySection.css';

const CredibilitySection = () => {
  const features = [
    {
      icon: '🚚', 
      text: 'Fast delivery time',
    },
    {
      icon: '⭐', 
      text: 'Reward points on item purchase',
    },
    {
      icon: '🛡️', 
      text: 'No fuss warranty',
    },
  ];

  return (
    <div className="credibility-section">
      {features.map((feature, index) => (
        <div key={index} className="feature">
          <div className="icon">{feature.icon}</div>
          <p>{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CredibilitySection;