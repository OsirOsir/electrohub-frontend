import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemCard.css';

function ItemCard({ item }) {
  const navigate = useNavigate();

  const handleCardClick = () => { //added to handle card click
    navigate(`/item-details/${item.id}`);
  };

  const handleLearnMoreClick = (e) => {
    e.stopPropagation(); // Prevents the card click event when clicking the button
    navigate(`/item-details/${item.id}`);
  };

  return (
    <div className="item-card" onClick={handleCardClick}>
      <div className="item-card-info">
        <img src={item.item_image_url} alt={item.item_name} />
        <h4>{item.item_name}</h4>
        <div className="item-features">
          <p>{item.item_features.feature1}</p>
          <p>{item.item_features.feature2}</p>
          <p>{item.item_features.feature3}</p>
        </div>
        <div className="item-price">
          <p>kes {item.item_price}</p>
          <p><span>kes {item.item_prev_price}</span></p>
        </div>
        {/* Buttons container added */}
        <div className="item-buttons">
          <button className="learn-more-btn" onClick={handleLearnMoreClick}>Learn More</button>
          <button className="add-to-cart-btn" onClick={(e) => e.stopPropagation()}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
