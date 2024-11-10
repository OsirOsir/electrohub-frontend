import React, { useState, useEffect } from 'react';
import Checkout from './Checkout';
import './Cart.css';

const Cart = ({ cartItems, onClose, onCheckout, username }) => {
  const [cart, setCart] = useState(cartItems);
  const [isCheckout, setIsCheckout] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  
  useEffect(() => {
    setIsCartEmpty(cart.length === 0);
  }, [cart]);

  
  const handleQuantityChange = (index, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
    }
  };

  
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  
  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckout(true); 
  };

  
  const handleConfirmPurchase = (orderDetails) => {
    setSuccessMessage("Your order has been successfully placed!");
    const orderSummary = { cartItems: cart, ...orderDetails }; 
    onCheckout(orderSummary); 
    setIsCheckout(false);
    setTimeout(() => onClose(), 2000);
  };

  return (
    <div className="cart-modal">
      <div className="modal-content">
        <h2>Your Cart</h2>

        {isCartEmpty ? (
          <>
            <p>Hello {username ? `${username}, ` : ""}your cart is empty. Add some items to proceed.</p>
            <button className="close-button" onClick={onClose}>Close</button>
          </>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <div>{item.name}</div>
                  <div>${item.price}</div>
                  <div>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(index, e)}
                    />
                  </div>
                  <div>
                    <button type="button" onClick={() => handleRemoveItem(index)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-total">
              <p>Total: ${calculateTotal()}</p>
            </div>

            <button type="button" onClick={handleProceedToCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
          </>
        )}

        {successMessage && <p className="success-message">{successMessage}</p>}

    
        {isCheckout && (
          <Checkout
            onConfirmPurchase={handleConfirmPurchase}
            onCancel={() => setIsCheckout(false)}
            totalAmount={calculateTotal()}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
