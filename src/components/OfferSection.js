import React from "react";
import './OfferSection.css';
import HotNewOffers from "./Hot&NewOffers";
import DailyDeals from "./DailyDeals";
import BestSellers from "./BestSellers";
import SeasonOffers from "./SeasonOffers";

function OfferSection(){

    return(
        <div className="items-on-offer-container">
            <h1>Items On Offer</h1>
            <div className="offer-items">
                <div className="offers-links">
                    <ul>
                        <li><a href="">Daily Deals</a></li>
                        <li><a href="">Best Sellers</a></li>
                        <li><a href="">Hot & New</a></li>
                        <li><a href="">Season Offers</a></li>
                    </ul>
                </div>
                <div className="offers-display">
                    <DailyDeals />
                    <BestSellers />
                    <HotNewOffers />
                    <SeasonOffers />
                </div>
                
            </div>
        </div>
    )
}

export default OfferSection;