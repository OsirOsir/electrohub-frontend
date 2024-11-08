import React from "react";
import ItemDetails from "./ItemDetails";
import './ItemCard.css'

function ItemCard({ item }){
    return(
        <div className="item-card">
            <h3>{item.item_name} Card</h3>
            <div className="item-card-info">
                <img src={item.item_image_url} alt={item.item_name}/>
                <h4>{item.item_name}</h4>
                <div className="item-price">
                    <p>kes {item.item_price}</p>
                    <p><span>kes {item.item_prev_price}</span></p>
                </div>
                <button className="learn-more-btn">Learn More</button>
                <button className="add-to-cart-btn">Add to cart</button>
            </div>
            <ItemDetails item={item}/>
        </div>
    )
}

export default ItemCard;