import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemDetails from "./ItemDetails";

import './ItemCard.css';

function ItemCard({ item }){
    const navigate = useNavigate();

    // const handleCardClick = () => {
    //     navigate(`/item-details/${item.id}`)
    // };

    const handleLearnMoreClick = (e) => {
        e.stopPropagation();
        navigate(`/item-details/${item.id}`)
    };
    // onClick={handleCardClick}
    return(
        <Link to={`/item-details/${item.id}`}>
            <div className="item-card" >
                <div className="item-card-info">
                    <img src={item.item_image_url} alt={item.item_name}/>
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
                    <div className="item-buttons">
                        <button className="learn-more-btn" onClick={handleLearnMoreClick}>Learn More</button>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                    
                </div>
            </div>
        </Link>
    )
}

export default ItemCard;
