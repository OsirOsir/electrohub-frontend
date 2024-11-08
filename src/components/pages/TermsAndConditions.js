import React from 'react';
import './TermsAndConditions.css'; // Import CSS for styling

function TermsAndConditions() {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>

      <p className="intro">
        Welcome to ElectroHub! These Terms and Conditions govern your use of our website and services. Please read these terms carefully before using ElectroHub. By accessing or using our services, you agree to comply with these terms.
      </p>

      <section className="section">
        <h2 className="section-title">1. Introduction</h2>
        <p>
          ElectroHub provides electronic products and services through its platform. These terms apply to all visitors, users, and others who wish to access or use our services.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">2. User Obligations</h2>
        <ul>
          <li>You agree to use our platform only for lawful purposes.</li>
          <li>You must not engage in any activity that could harm the site or its users.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">3. Privacy Policy</h2>
        <p>
          Your privacy is important to us. Please review our <a href="/privacy-policy">Privacy Policy</a> to understand how we collect, use, and protect your information.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">4. Terms of Service</h2>
        <p>
          The use of our services is subject to our Terms of Service. By using our platform, you agree to be bound by these terms.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account if you violate these Terms and Conditions. Upon termination, you must immediately stop using our services.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">6. Changes to Terms</h2>
        <p>
          ElectroHub reserves the right to update or change these Terms and Conditions at any time. Please review them periodically for any updates.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">7. Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, feel free to <a href="/contact">contact us</a>.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 ElectroHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default TermsAndConditions;
