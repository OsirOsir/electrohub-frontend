import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import FAQsPage from './components/FAQsPage';
import FeedbackPage from './components/FeedbackPage';
import TermsAndConditions from './components/pages/TermsAndConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';
import AboutUs from './components/pages/AboutUs';
import Support from './components/Support';
import Warranty from './components/Warranty';
import OrderSupport from './components/OrderSupport';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CredibilitySection from './components/CredibilitySection';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <CredibilitySection />
        <main className="main-content">
          <Routes>
            {/* Customer Support Routes */}
            <Route path="/FAQs" element={<FAQsPage />} />
            <Route path="/Customer-Feedback" element={<FeedbackPage />} />
            <Route path="/" element={<Support />} />
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
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
