import React, { useState } from 'react';
import './TermsAndConditions.css';

function TermsAndConditions() {
  const [sectionsOpen, setSectionsOpen] = useState({
    intro: false,
    userObligations: false,
    privacyPolicy: false,
    termsOfService: false,
    termination: false,
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
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>

      <p className="intro">
        Welcome to ElectroHub! These Terms and Conditions govern your use of our website and services.
        Please read these terms carefully before using ElectroHub. By accessing or using our services,
        you agree to comply with these terms.
      </p>

      <section className="section">
        <h2
          className={`section-title ${sectionsOpen.intro ? 'open' : ''}`}
          onClick={() => toggleSection('intro')}
        >
          1. Introduction
        </h2>
        {sectionsOpen.intro && (
          <div className="section-content">
            <p>
              ElectroHub provides electronic products and services through its platform. These terms apply
              to all visitors, users, and others who wish to access or use our services.
            </p>
          </div>
        )}
      </section>

      <section className="section">
        <h2
          className={`section-title ${sectionsOpen.userObligations ? 'open' : ''}`}
          onClick={() => toggleSection('userObligations')}
        >
          2. User Obligations
        </h2>
        {sectionsOpen.userObligations && (
          <div className="section-content">
            <ul>
              <li>You agree to use our platform only for lawful purposes.</li>
              <li>You must not engage in any activity that could harm the site or its users.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            </ul>
          </div>
        )}
      </section>

      <section className="section">
        <h2
          className={`section-title ${sectionsOpen.privacyPolicy ? 'open' : ''}`}
          onClick={() => toggleSection('privacyPolicy')}
        >
          3. Privacy Policy
        </h2>
        {sectionsOpen.privacyPolicy && (
          <div className="section-content">
            <p>
              Your privacy is important to us. Please review our{' '}
              <a href="/privacy-policy">Privacy Policy</a> to understand how we collect, use, and protect your information.
            </p>
          </div>
        )}
      </section>

      
      <section className="section">
        <h2
          className={`section-title ${sectionsOpen.termsOfService ? 'open' : ''}`}
          onClick={() => toggleSection('termsOfService')}
        >
          4. Terms of Service
        </h2>
        {sectionsOpen.termsOfService && (
          <div className="section-content">
            <p>
              The use of our services is subject to our Terms of Service. By using our platform, you agree to be bound by these terms.
            </p>
          </div>
        )}
      </section>

      
      <section className="section">
        <h2
          className={`section-title ${sectionsOpen.termination ? 'open' : ''}`}
          onClick={() => toggleSection('termination')}
        >
          5. Termination
        </h2>
        {sectionsOpen.termination && (
          <div className="section-content">
            <p>
              We reserve the right to suspend or terminate your account if you violate these Terms and Conditions.
              Upon termination, you must immediately stop using our services.
            </p>
          </div>
        )}
      </section>

      
      <section className="section">
        <h2
          className={`section-title ${sectionsOpen.changes ? 'open' : ''}`}
          onClick={() => toggleSection('changes')}
        >
          6. Changes to Terms
        </h2>
        {sectionsOpen.changes && (
          <div className="section-content">
            <p>
              ElectroHub reserves the right to update or change these Terms and Conditions at any time. Please review them periodically for any updates.
            </p>
          </div>
        )}
      </section>

      
      <section className="section">
        <h2
          className={`section-title ${sectionsOpen.contact ? 'open' : ''}`}
          onClick={() => toggleSection('contact')}
        >
          7. Contact Us
        </h2>
        {sectionsOpen.contact && (
          <div className="section-content">
            <p>
              If you have any questions about these Terms and Conditions, feel free to{' '}
              <a href="/contact">contact us</a>.
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

export default TermsAndConditions;
