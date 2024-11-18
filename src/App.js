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
import UpdateItemForm from './components/UpdateItemForm'; 

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

      {/* Include AddItemForm, UpdateItemForm, and SpecialCategoryForm */}
      <div className="form-container">
        <AddItemForm onAddItem={handleNewItem} />
        <SpecialCategoryForm itemId={1} /> 
        <UpdateItemForm /> 
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
// import SpecialCategoryForm from './components/SpecialCategoryForm';
// import AddItemForm from './components/AddItemForm';
// import ItemForm from './components/UpdateItemForm';
// import ItemsInStock from './components/ItemsInStock'; // Import ItemsInStock component

// const App = () => {
//   const [items, setItems] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all items when the component is mounted
//   useEffect(() => {
//     fetch("http://127.0.0.1:5555/items") // Ensure the correct backend URL
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setItems(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   const addToCart = (item) => {
//     setCart(prevCart => [...prevCart, item]);
//   };

//   const handleNewItem = (newItem) => {
//     setItems(prevItems => [...prevItems, newItem]);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Welcome to ElectroHub</h1>
//       </header>

//       <div className="form-container">
//         <AddItemForm onAddItem={handleNewItem} />
//         <SpecialCategoryForm itemId={1} />
//         <ItemForm />
//         {/* Display ItemsInStock dynamically by passing itemId */}
//         {loading ? <p>Loading items...</p> : <ItemsInStock itemId={1} />}
//       </div>

//       <Navbar addToCart={addToCart} cartItems={cart.length} />
//       <CredibilitySection />

//       <main className="main-content">
//         <Routes>
//           <Route path="/" element={
//             <div>
//               {loading ? <p>Loading items...</p> : <OfferSection items={items} />}
//               <ItemsAll items={items} addToCart={addToCart} />
//             </div>
//           } />

//           <Route path="/item-details/:id" element={<ItemDetails items={items} />} />

//           <Route path="/FAQs" element={<FAQsPage />} />
//           <Route path="/Customer-Feedback" element={<FeedbackPage />} />
//           <Route path="/support" element={<Support />} />
//           <Route path="/warranty" element={<Warranty />} />
//           <Route path="/order-support" element={<OrderSupport />} />
//           <Route path="/terms" element={<TermsAndConditions />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>

//         <Support />
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default App;
