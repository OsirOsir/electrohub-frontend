import React, { useState, useEffect} from "react";
import ItemCard from "./ItemCard";

function HotNewOffers(){
    const [hotNew , setHotNew] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8001/hot&new")
        .then(response => response.json())
        .then(data => setHotNew(data));
      }, []);


    return(
        <div className="items-offers-deals">
            <h2>Hot & New</h2>
            
            <div className="offer-items-cards">
                {hotNew.map((item) => (
                    <ItemCard key={item.id} item={item}/>
                ))}
            </div>

        </div>
    )
}

export default HotNewOffers;