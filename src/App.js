import React, { useState, useEffect} from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OfferSection from './components/OfferSection';
import ItemsAll from './components/ItemsAll';
// import ItemDetails from './components/ItemDetails';
import TermsAndConditions from './components/pages/TermsAndConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';
import AboutUs from './components/pages/AboutUs';

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    fetch("http://localhost:8001/items")
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  return (
    <div className="App">
      <OfferSection items={items}/>
      <ItemsAll items={items}/>
      {/* <Router>
        <Routes>
          <Route path="/item-details/:id" element={items.map((item) => (
                    <ItemDetails key={item.id} item={item} />
                ))}/>
        </Routes>
      </Router> */}
      <Router>
        <Navbar addToCart={addToCart} cartItems={cart} /> {/* Passing cart and addToCart to Navbar */}
        <div className="main-content">
          <Routes>
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/" element={
              <div>
                <OfferSection items={items} />
                <ItemsAll items={items} addToCart={addToCart} />
              </div>
            } />
            {/* Default route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
