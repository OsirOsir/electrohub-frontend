import React from 'react';
import ItemCard from './ItemCard'; // Import the ItemCard component
import './CategoryItems.css';

const CategoryItems = ({ items }) => {
    return (
        <div className="category-items">
            <div className="items-grid">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CategoryItems;
