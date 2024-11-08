import React from "react";
import './ItemDetails.css'

function ItemDetails({ item }){
    return(
        <div className="item-details">
            <h3>{item.item_name} Details</h3>
            <div className="item-details-info">
                <div className="item-details-content">
                    <div className="item-details-image">
                        <img src={item.item_image_url} alt={item.item_name}/>
                    </div>
                    <div className="item-details-text">
                        <h4>{item.item_name}</h4>
                        <div className="item-details-price">
                            <p>{item.item_price}</p>
                            <p><span>{item.item_prev_price}</span></p>
                        </div>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </div>
                </div>
                
                <div className="item-reviews">
                    <p>{item.item_name} reviews</p>
                </div>
                
            </div>
        </div>
    )
}

export default ItemDetails;