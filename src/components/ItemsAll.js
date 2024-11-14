import React from "react";
import ItemCard from "./ItemCard";
import './ItemsAll.css';
import './ItemsAll.css';

function ItemsAll({ items, addToCart }) {
    return (
        <div className="all-items">
            <div className="all-items-header">
                <h1>All Items</h1>
                <button className="create-item-btn">Create Item</button>
            </div>
            
            <div className="items-display">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default ItemsAll;

