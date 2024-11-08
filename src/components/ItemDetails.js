import React, { useEffect, useState } from "react";
import './ItemDetails.css'

function ItemDetails({ item }) {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [newReview, setNewReview] = useState({ rating: 0, message: ''});
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(() => {
        fetch(`/api/items/${item.id}/reviews`)
            .then(response => response.json())
            .then(data => {
                setReviews(data.reviews);
                setAverageRating(data.averageRating);
            });
    }, [item.id]);

    const handleReviewSubmit = () => {
        fetch(`/api/items/${item.id}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
        })
        .then(response => response.json())
        .then(data => {
            setReviews([...reviews, data.review]);
            setAverageRating(data.newAverageRating);
            setNewReview({ rating: 0, message: ''});
        });
    };

    const handleStarClick = (rating) => {
        setNewReview({...newReview, rating });
    };

    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };


    return(
        <div className="item-details">
            <div className="item-details-info">
                <h3>{item.item_name} Details</h3>
                <div className="item-details-content">
                    <div className="item-details-image">
                        <img src={item.item_image_url} alt={item.item_name}/>
                    </div>
                    <div className="item-details-text">
                        <h3>{item.item_name}</h3>
                        <div className="item-details-features">
                            <ul className="item-features-list">
                                <li>{item.item_features.feature1}</li>
                                <li>{item.item_features.feature2}</li>
                                <li>{item.item_features.feature3}</li>
                            </ul>
                        </div>
                        <div className="item-details-price">
                            <p>kes {item.item_price}</p>
                            <p><span>kes {item.item_prev_price}</span></p>
                        </div>
                        <button className="details-add-to-cart-btn">Add to Cart</button>
                        <div className="crud-btns">
                            <button className="item-update-btn">Update item</button>
                            <button className="item-delete-btn">Delete item</button>
                        </div>
                    </div>
                </div>
                
                <div className="item-reviews">
                    <p>{item.item_name} Reviews</p>
                    <div className="ratings">
                        <div className="ratings-snapshot">
                            <p>Ratings Snapshot</p>
                        </div>
                        <div className="overall-rating">
                            <p>Overall Rating</p>
                            <p><span>{averageRating.toFixed(1)}</span></p>
                        </div>
                        <div className="review-product">
                            <p>Review this Product</p>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${star <= (hoveredRating || newReview.rating) ? "filled" : ""}`}
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => handleStarHover(star)}
                                        onMouseLeave={handleStarLeave}
                                    >★</span>
                                ))}
                            </div>
                            <div className="review-message">
                                <textarea 
                                    placeholder="Write your review..."
                                    value={newReview.message}
                                    onChange={(e) => setNewReview({...newReview, message: e.target.value })}
                                />
                                <button onClick={handleReviewSubmit}>Submit Review</button>
                                <p>*Adding a review will need a valid email for verification</p>
                            </div>
                        </div>
                    </div>
                    <div className="reviews">
                        <div className="review-card">
                            <h6>Username</h6>
                            <p>Message</p>
                            <p>ratings</p>
                            <p>Time & Date</p>
                        </div>
                        {reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <h6>{review.username}</h6>
                                <p>{review.message}</p>
                                <p>Rating: {review.rating}</p>
                                <p>{new Date(review.date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ItemDetails;