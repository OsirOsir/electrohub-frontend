import React, { useState } from 'react';

const Checkout = ({ cartItems, username, handleCheckout }) => {
  const [billingInfo, setBillingInfo] = useState({
    name: username,
    address: '',
    city: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCheckout(billingInfo); 
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-modal">
      <h2>Checkout</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={billingInfo.name}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={billingInfo.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={billingInfo.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={billingInfo.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <p>Total: ${totalAmount}</p>
        </div>
        <button type="submit">Complete Checkout</button>
      </form>
    </div>
  );
};

export default Checkout;
