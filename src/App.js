// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import OfferSection from './components/OfferSection';
// import ItemsAll from './components/ItemsAll';
// import FAQsPage from './components/FAQsPage';
// import FeedbackPage from './components/FeedbackPage';
// import TermsAndConditions from './components/pages/TermsAndConditions';
// import PrivacyPolicy from './components/pages/PrivacyPolicy';
// import Contact from './components/pages/Contact';
// import AboutUs from './components/pages/AboutUs';
// import Support from './components/Support';
// import Warranty from './components/Warranty';
// import OrderSupport from './components/OrderSupport';
// import CredibilitySection from './components/CredibilitySection';
// import ItemDetails from './components/ItemDetails';


// const App = () => {
//   const [items, setItems] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8001/items")
//       .then(response => response.json())
//       .then(data => setItems(data));
//   }, []);

//   const addToCart = (item) => {
//     setCart(prevCart => [...prevCart, item]);
//   };

//   return (
//     <div className="App">
//       <Navbar addToCart={addToCart} cartItems={cart.length} />
//       <CredibilitySection />

//       {/* Main content */}
//       <main className="main-content">
//         <Routes>
//           {/* Shopping Pages (Route for homepage) */}
//           <Route path="/" element={
//             <div>
//               <OfferSection items={items} />
//               <ItemsAll items={items} addToCart={addToCart} />
//             </div>
//           } />

//           {/* Item Details Route */}
//           <Route path="/item-details/:id" element={<ItemDetails items={items} />} />

//           {/* Customer Support Pages */}
//           <Route path="/FAQs" element={<FAQsPage />} />
//           <Route path="/Customer-Feedback" element={<FeedbackPage />} />
//           <Route path="/support" element={<Support />} />
//           <Route path="/warranty" element={<Warranty />} />
//           <Route path="/order-support" element={<OrderSupport />} />

//           {/* Other Pages */}
//           <Route path="/terms" element={<TermsAndConditions />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<AboutUs />} />

//           {/* Default Route */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>

//         {/* Customer Support Card */}
//         <Support />
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OfferSection from './components/OfferSection';
import ItemsAll from './components/ItemsAll';
import FAQsPage from './components/FAQsPage';
import FeedbackPage from './components/FeedbackPage';
import TermsAndConditions from './components/pages/TermsAndConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';
import AboutUs from './components/pages/AboutUs';
import Support from './components/Support';
import Warranty from './components/Warranty';
import OrderSupport from './components/OrderSupport';
import CredibilitySection from './components/CredibilitySection';
import ItemDetails from './components/ItemDetails';
import SpecialCategoryForm from './components/SpecialCategoryForm';
import AddItemForm from './components/AddItemForm'; 
import ItemForm from './components/ItemForm';

const App = () => {
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

  const handleNewItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to ElectroHub</h1>
      </header>

      {/* Include AddItemForm and SpecialCategoryForm */}
      <div className="form-container">
        <AddItemForm onAddItem={handleNewItem} />
        <SpecialCategoryForm itemId={1} /> {/* Example for item with id 1 */}
        <div className="form-container">
        <ItemForm /> {/* New form for updating items */}
</div>

      </div>

      <Navbar addToCart={addToCart} cartItems={cart.length} />
      <CredibilitySection />

      {/* Main content */}
      <main className="main-content">
        <Routes>
          {/* Shopping Pages (Route for homepage) */}
          <Route path="/" element={
            <div>
              <OfferSection items={items} />
              <ItemsAll items={items} addToCart={addToCart} />
            </div>
          } />

          {/* Item Details Route */}
          <Route path="/item-details/:id" element={<ItemDetails items={items} />} />

          {/* Customer Support Pages */}
          <Route path="/FAQs" element={<FAQsPage />} />
          <Route path="/Customer-Feedback" element={<FeedbackPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/order-support" element={<OrderSupport />} />

          {/* Other Pages */}
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Customer Support Card */}
        <Support />
      </main>

      <Footer />
    </div>
  );
};

export default App;
