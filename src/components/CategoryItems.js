import React from 'react';
import ItemCard from './ItemCard'; // Import the ItemCard component
import './CategoryItems.css';

const CategoryItems = ({ items, onClose, addToCart }) => {
    return (
        <div className="category-items">
            <button className="close-button" onClick={onClose}>Close</button>            
            <div className="items-grid">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default CategoryItems;