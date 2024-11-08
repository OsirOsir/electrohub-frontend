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
                    <h5>Daily Deals</h5>
                    <h5>Best Sellers</h5>
                    <h5>Hot & New</h5>
                    <h5>Season Offers</h5>
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