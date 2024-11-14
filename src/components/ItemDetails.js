import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './ItemDetails.css';

function ItemDetails() {
    const [item, setItem] = useState({});
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [newReview, setNewReview] = useState({ rating: 0, message: ''});
    const [hoveredRating, setHoveredRating] = useState(0);
    const params = useParams();
    const itemId = params.id;


    useEffect(() => {
        fetch(`http://127.0.0.1:5555/api/item_details/item_id/${itemId}`)
            .then(response => response.json())
            .then(data => {
                setItem(data);
            })
            .catch(error => console.error("Error fetching item details:", error));
    }, [itemId]);


    useEffect(() => {
        fetch(`http://127.0.0.1:5555/api/item_id/${itemId}/reviews`)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error("Error fetching reviews:", error));

        fetch(`http://127.0.0.1:5555/api/item/item_id/${itemId}/average_rating`)
            .then(response => response.json())
            .then(data => setAverageRating(data.average_rating))
            .catch(error => console.error("Error fetching average rating:", error));

    }, [itemId])

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
            setReviews([...reviews, data]);
            setNewReview({ rating: 0, message: ''});
            fetchAverageRating();
        })
        .catch(error => console.error("Error submitting review: ", error));
    };

    const handleUpdateReview = (reviewId, updatedReview) => {
        fetch(`http://127.0.0.1:5555/api/items/reviews/${reviewId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedReview)
        })
        .then(response => response.json())
        .then(data => {
            setReviews(reviews.map(review => review.id === reviewId ? data : review));
            fetchAverageRating();
        })
        .catch(error => console.error("Error updating review:", error));
    };

    const handleDeleteReview = (reviewId) => {
        fetch(`http://127.0.0.1:5555/api/items/reviews/${reviewId}`, {
            method: 'DELETE'
        })
        .then(() => {
            setReviews(reviews.filter(review => review.id !== reviewId));
            fetchAverageRating();
        })
        .catch(error => console.error("Error deleting review:", error));
    }

    const fetchAverageRating = () => {
        fetch(`http://127.0.0.1:5555/api/item/item_id/${itemId}/average_rating`)
            .then(response => response.json())
            .then(data => setAverageRating(data.average_rating))
            .catch(error => console.error("Error fetching average rating: ", error))
    }

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
                    <h2>{item.item_name} Reviews</h2>
                    <div className="ratings">
                        {/* <div className="ratings-snapshot">
                            <p>Ratings Snapshot</p>
                        </div> */}
                        <div className="overall-rating">
                            <p>Overall Rating</p>
                            <p><span>{averageRating ? averageRating.toFixed(1) : ""}</span></p>
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
                                    value={newReview.review_message}
                                    onChange={(e) => setNewReview({...newReview, review_message: e.target.value })}
                                />
                                <button onClick={handleReviewSubmit}>Submit Review</button>
                                <p>*Adding a review will need a valid email for verification</p>
                            </div>
                        </div>
                    </div>
                    <div className="reviews">
                        {reviews.length > 0 ? reviews.map(review => (
                            <div key={review.id} className="review-card">
                                <h4>{review.user.username}</h4>
                                <p>{review.review_message}</p>
                                <p>Rating: {review.rating}</p>
                                <p><span>{review.created_at}</span></p>
                                <button onClick={() => handleUpdateReview(review.id, { ...review, review_message: 'Updated message' })}>Update</button>
                                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                            </div>
                        )) : <p>No reviews yet</p>}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ItemDetails;

