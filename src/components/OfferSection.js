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
                <DailyDeals />
                <BestSellers />
                <HotNewOffers />
                <SeasonOffers />
            </div>
        </div>
    )
}

export default OfferSection;