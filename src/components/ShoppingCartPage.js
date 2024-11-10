import React, { useState } from 'react';
import Cart from './Cart';

const ShoppingCartPage = () => {
  const [showCart, setShowCart] = useState(false);  
  const [cartItems, setCartItems] = useState([
    { name: 'Item 1', price: 10, quantity: 1 },
    { name: 'Item 2', price: 20, quantity: 2 },
    { name: 'Item 3', price: 15, quantity: 1 },
  ]);
  const [username, setUsername] = useState("John");

  const handleCheckout = (cartData) => {
    console.log('Checking out with cart:', cartData);
    
  };

  return (
    <div>
      
      <button onClick={() => setShowCart(true)}>View Cart</button>

      
      {showCart && (
        <Cart
          cartItems={cartItems}
          onClose={() => setShowCart(false)}  
          onCheckout={handleCheckout}
          username={username}
        />
      )}
    </div>
  );
};

export default ShoppingCartPage;
