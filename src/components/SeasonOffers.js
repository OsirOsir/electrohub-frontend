import React, { useState, useEffect} from "react";
import ItemCard from "./ItemCard";

function SeasonOffers(){
    const [seasonOffers , setSeasonOffers] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
    fetch("http://localhost:8001/seasonOffers")
    .then(response => response.json())
    .then(data => setSeasonOffers(data));
    }, []);

    const handleSwipeLeft = () => {
        setOffset((prevOffset) => prevOffset + 900);
    };

    const handleSwipeRight = () => {
        setOffset((prevOffset) => Math.max(prevOffset - 900, 0));
    };


    return(
        <div className="items-offers-deals">
            <h2>Season Offers</h2>
            <div className="swipe-buttons">
                <button onClick={handleSwipeRight}>{"<"}</button>
                <button onClick={handleSwipeLeft}>{">"}</button>
            </div>
            <div className="offer-items-cards"
            style={{
                transform: `translateX(-${offset}px)`,
                transition: 'transform 0.5s ease',
            }}>
                {seasonOffers.map((item) => (
                    <ItemCard key={item.id} item={item}/>
                ))}
            </div>
            
        </div>
    )
}

export default SeasonOffers;