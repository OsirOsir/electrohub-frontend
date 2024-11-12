import React from 'react';
import ItemCard from './ItemCard'; // Import the ItemCard component

const CategoryItems = ({ items }) => {
    return (
        <div className="category-items">
            <h2>Items</h2>
            <div className="items-grid">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CategoryItems;
