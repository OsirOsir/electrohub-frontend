import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './ItemDetails.css';

function ItemDetails() {
    const [item, setItem] = useState({});
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [newReview, setNewReview] = useState({ rating: 0, message: ''});
    const [hoveredRating, setHoveredRating] = useState(0);
    const params = useParams();
    const itemId = params.id;

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/api/item_details/item_id/${itemId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setItem(data);
            })
            .catch(error => console.error("Error fetching item details:", error));
    }, [itemId]);

    if (!item) {
        return <p>Loading item details...</p>;
    }

    const handleReviewSubmit = () => {
        fetch(`http://127.0.0.1:5555/api/item_id/${itemId}/reviews`, {
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
                <div className="item-details-content">
                    <div className="item-details-image">
                        <img src={`http://127.0.0.1:5555/static/${item.item_image_url}`} alt={item.item_name}/>
                    </div>
                    <div className="item-details-text">
                        <h3>{item.item_name}</h3>
                        <div className="item-details-features">
                            {item.item_features 
                                ? Object.entries(item.item_features).map(([key, value]) => (
                                    <li key={key}>{value}</li>
                                ))
                                : <li>No features available</li>
                            }
                        </div>
                        <div className="item-details-price">
                            <p>kes {item.item_price}</p>
                            <p><span>kes {item.item_prev_price}</span></p>
                        </div>
                        <button className="details-add-to-cart-btn">Add to Cart</button>
                        <div className="crud-btns">
                            <button className="item-update-btn">Update Item</button>
                            <button className="item-delete-btn">Delete Item</button>
                        </div>
                        <div className="special-category-btn">
                            <button className="add-to-special-category-btn">Add to special category</button>
                            <button className="remove-from-special-category-btn">Remove from special category</button>
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
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <h6>{review.username}</h6>
                                <p>{review.message}</p> {/* Add conditional rendering to the whole review if the review_message is an empty string */}
                                <p>Rating: {review.rating}</p>
                                <p>{review.created_at}</p>
                                {/* <p>{new Date(review.date).toLocaleString()}</p> */}
                            </div>
                        ))) : (<p>No reviews yet</p>)}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ItemDetails;