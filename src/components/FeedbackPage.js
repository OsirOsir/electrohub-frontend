import React, { useState } from "react";

function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productName: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setSubmitted(false); // Reset submitted state when reopening the form
  };

  return (
    <div>
      <button onClick={toggleForm} className="customer-feedback-button">
        <span role="img" aria-label="Customer Feedback Icon">👤</span> Customer Feedback
      </button>

      {showForm && (
        <div className="feedback-form">
          {submitted ? (
            <p>Thank you for your feedback!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Product Name:</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Feedback:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Submit Feedback</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default FeedbackPage;