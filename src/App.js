import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FAQsPage from "./components/FAQsPage";
import FeedbackPage from "./components/FeedbackPage";
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="support-container">
        <h1>Customer Support</h1>

        <div className="support-links">
          {/* FAQs Link */}
          <Link to="/FAQs" className="support-item">
            <div className="CustomerSupport-icon">✉ </div>
            <h2>FAQs</h2>
          </Link>

          {/* Customer Feedback Link */}
          <Link to="/Customer-Feedback" className="support-item">
            <div className="CustomerSupport-icon">👩‍🔬 </div>
            <h2>Customer Feedback</h2>
          </Link>
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/FAQs" element={<FAQsPage />} />
          <Route path="/Customer-Feedback" element={<FeedbackPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
