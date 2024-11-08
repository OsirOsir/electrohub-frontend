import React, { useState, useEffect} from "react";
import ItemCard from "./ItemCard";

function SeasonOffers(){
    const [seasonOffers , setSeasonOffers] = useState([]);

    useEffect(() => {
    fetch("http://localhost:8001/seasonOffers")
    .then(response => response.json())
    .then(data => setSeasonOffers(data));
    }, []);


    return(
        <div className="items-offers-deals">
            <h3>Season Offers</h3>
            <div className="offer-items-cards">
                {seasonOffers.map((item) => (
                    <ItemCard key={item.id} item={item}/>
                ))}
            </div>
            
        </div>
    )
}

export default SeasonOffers;