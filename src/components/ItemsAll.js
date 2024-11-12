import React from "react";
import ItemCard from "./ItemCard";
import './ItemsAll.css';
import './ItemsAll.css';

function ItemsAll({ items, addToCart }) {
    return (
        <div className="all-items">
            <h1>All Products</h1>
            <div className="items-display">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default ItemsAll;

