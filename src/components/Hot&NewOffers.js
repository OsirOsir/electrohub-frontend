import React, { useState, useEffect} from "react";
import ItemCard from "./ItemCard";

function HotNewOffers(){
    const [hotNew , setHotNew] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/api/items/hot_&_new")
        .then(response => response.json())
        .then(data => setHotNew(data));
      }, []);

      const handleSwipeLeft = () => {
        setOffset((prevOffset) => prevOffset + 900);
    };

    const handleSwipeRight = () => {
        setOffset((prevOffset) => Math.max(prevOffset - 900, 0));
    };


    return(
        <div className="items-offers-deals">
            <h2>Hot & New</h2>
            <div className="swipe-buttons">
                <button onClick={handleSwipeRight}>{"<"}</button>
                <button onClick={handleSwipeLeft}>{">"}</button>
            </div>
            
            <div className="offer-items-cards"
            style={{
                transform: `translateX(-${offset}px)`,
                transition: 'transform 0.5s ease',
            }}>
                {hotNew.map((item) => (
                    <ItemCard key={item.id} item={item}/>
                ))}
            </div>

        </div>
    )
}

export default HotNewOffers;