import React from "react";
import { useNavigate} from "react-router-dom";
import ItemCard from "./ItemCard";
import './ItemsAll.css';
import './ItemsAll.css';

function ItemsAll({ items, addToCart }) {
    const navigate = useNavigate();

    const handleShowModalsButtons = (e) => {
        e.stopPropagation();
        navigate("/modify-items-modals")
    };

    return (
        <div className="all-items">
            <div className="all-items-header">
                <h1>All Items</h1>
                {/* If user is not admin should not see the below button */}
                <button className="modify-item-btn" onClick={handleShowModalsButtons}>Modify Items</button> 
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

