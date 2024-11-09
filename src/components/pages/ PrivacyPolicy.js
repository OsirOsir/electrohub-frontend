import React, { useState } from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  
  const [sectionsOpen, setSectionsOpen] = useState({
    info: false,
    usage: false,
    protection: false,
    sharing: false,
    rights: false,
    changes: false,
    contact: false,
  });

  
  const toggleSection = (section) => {
    setSectionsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>

      <p className="intro">
        Welcome to ElectroHub! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website and use our services.
      </p>

      <section className="section">
        <h2 className="section-title" onClick={() => toggleSection('info')}>
          1. Information We Collect
        </h2>
        {sectionsOpen.info && (
          <div className="section-content">
            <p>We collect various types of information when you use our services, including:</p>
            <ul>
              <li><strong>Personal Information:</strong> Information that identifies you such as your name, email, address, and payment details.</li>
              <li><strong>Usage Data:</strong> Information on how you interact with our website, including IP addresses, browser type, and pages visited.</li>
              <li><strong>Cookies:</strong> Small text files stored on your device to help enhance your experience on our website.</li>
            </ul>
          </div>
        )}
      </section>

      <section className="section">
        <h2 className="section-title" onClick={() => toggleSection('usage')}>
          2. How We Use Your Information
        </h2>
        {sectionsOpen.usage && (
          <div className="section-content">
            <p>We use your information to:</p>
            <ul>
              <li>Provide and improve our services.</li>
              <li>Process your transactions and fulfill orders.</li>
              <li>Communicate with you regarding updates, offers, or customer service inquiries.</li>
              <li>Personalize your experience and offer relevant content.</li>
            </ul>
          </div>
        )}
      </section>

    
      <section className="section">
        <h2 className="section-title" onClick={() => toggleSection('protection')}>
          3. How We Protect Your Information
        </h2>
        {sectionsOpen.protection && (
          <div className="section-content">
            <p>
              We implement security measures to ensure the protection of your personal information. These include encryption, access controls, and regular security audits. However, please note that no data transmission over the internet is completely secure.
            </p>
          </div>
        )}
      </section>

      
      <section className="section">
        <h2 className="section-title" onClick={() => toggleSection('sharing')}>
          4. Sharing Your Information
        </h2>
        {sectionsOpen.sharing && (
          <div className="section-content">
            <p>We do not share your personal information with third parties except in the following cases:</p>
            <ul>
              <li>When required by law or to protect our rights and safety.</li>
              <li>With trusted third-party service providers who assist in operating our website, processing payments, or fulfilling orders.</li>
              <li>If we sell or transfer our business assets, in which case your information will be part of the transferred assets.</li>
            </ul>
          </div>
        )}
      </section>

    
      <section className="section">
        <h2 className="section-title" onClick={() => toggleSection('rights')}>
          5. Your Data Rights
        </h2>
        {sectionsOpen.rights && (
          <div className="section-content">
            <p>You have the right to:</p>
            <ul>
              <li>Request access to the personal information we hold about you.</li>
              <li>Request corrections to any inaccuracies in your personal data.</li>
              <li>Request the deletion of your personal data, subject to applicable laws.</li>
              <li>Object to the processing of your data in certain situations.</li>
            </ul>
          </div>
        )}
      </section>

      <section className="section">
        <h2 className="section-title" onClick={() => toggleSection('changes')}>
          6. Changes to This Privacy Policy
        </h2>
        {sectionsOpen.changes && (
          <div className="section-content">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. Please review it periodically for any updates.
            </p>
          </div>
        )}
      </section>

      <section className="section">
        <h2 className="section-title" onClick={() => toggleSection('contact')}>
          7. Contact Us
        </h2>
        {sectionsOpen.contact && (
          <div className="section-content">
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please feel free to <a href="/contact">contact us</a>.
            </p>
          </div>
        )}
      </section>

      <footer className="footer">
        <p>&copy; 2024 ElectroHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;
