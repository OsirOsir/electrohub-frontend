import React from "react";
import ItemCard from "./ItemCard";
import './ItemsAll.css'

function ItemsAll({ items }){
    return(
        <div className="all-items">
            <h1>All Products</h1>
            <div className="items-display">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
            
        </div>
    )
}

export default ItemsAll;