import React, { useState, useEffect} from "react";
import ItemCard from "./ItemCard";

function BestSellers(){
    const [bestSellers , setBestSellers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8001/bestSellers")
        .then(response => response.json())
        .then(data => setBestSellers(data));
      }, []);


    return(
        <div className="items-offers-deals">
            <h3>Best Sellers</h3>
            <div className="offer-items-cards">
                {bestSellers.map((item) => (
                    <ItemCard key={item.id} item={item}/>
                ))}
                
            </div>
        </div>
    )
}

export default BestSellers;