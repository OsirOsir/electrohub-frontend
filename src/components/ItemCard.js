import React from "react";
import ItemDetails from "./ItemDetails";
import './ItemCard.css'

function ItemCard({ item }){
    return(
        <div className="item-card">
            <div className="item-card-info">
                <h3>{item.item_name} Card</h3>
                <img src={item.item_image_url} alt={item.item_name}/>
                <h4>{item.item_name}</h4>
                <div className="item-features">
                    <p>{item.item_features.feature1}, {item.item_features.feature2}, {item.item_features.feature3}</p>
                </div>
                <div className="item-price">
                    <p>kes {item.item_price}</p>
                    <p><span>kes {item.item_prev_price}</span></p>
                </div>
                <button className="learn-more-btn">Learn More</button>
                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
            <ItemDetails item={item}/>
        </div>
    )
}

export default ItemCard;