import React, { useState, useEffect} from "react";
import ItemCard from "./ItemCard";

function DailyDeals(){
    const [dailyDeals , setDailyDeals] = useState([]);


    useEffect(() => {
    fetch("http://localhost:8001/dailyDeals")
    .then(response => response.json())
    .then(data => setDailyDeals(data));
    }, []);


    return(
        <div className="items-offers-deals">
            <h2>Daily Deals</h2>
            
            <div className="offer-items-cards">
                {dailyDeals.map((item) => (
                    <ItemCard key={item.id} item={item}/>
                ))}
            </div>
        </div>
    )
}

export default DailyDeals;