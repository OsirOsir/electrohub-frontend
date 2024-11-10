import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FAQsPage from './components/FAQsPage';
import FeedbackPage from './components/FeedbackPage';
import TermsAndConditions from './components/pages/TermsAndConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';
import AboutUs from './components/pages/AboutUs';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            {/* Customer Support Routes */}
            <Route path="/FAQs" element={<FAQsPage />} />
            <Route path="/Customer-Feedback" element={<FeedbackPage />} />

            {/* Other Pages */}
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Default Route (Redirect to Homepage or another default page) */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Customer Support Links */}
        <div className="support-container">
          <h1>Customer Support</h1>

          <div className="support-links">
            <Link to="/FAQs" className="support-item">
              <div className="CustomerSupport-icon">✉ </div>
              <h2>FAQs</h2>
            </Link>

            <Link to="/Customer-Feedback" className="support-item">
              <div className="CustomerSupport-icon">👩‍🔬 </div>
              <h2>Customer Feedback</h2>
            </Link>
          </div>
        </div>

        <Footer />
      </Router>
    </div>
  );
};

export default App;