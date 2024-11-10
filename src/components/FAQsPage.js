import React, { useState } from "react";

const faqData = [
  { question: "How can I place an order?", answer: "Placing an order is easy! Simply browse our website, select the products you want, add them to your cart, and proceed to checkout." },
  { question: "How do I track my order?", answer: "Log in to your account and go to 'Order Support' to track your order." },
  { question: "Do you offer delivery services?", answer: "Yes, we offer delivery services outside Nairobi at additional charges." },
  { question: "Can I cancel my order?", answer: "You can cancel an order within 24 hours of placing it." },
  { question: "What payment methods do you accept?", answer: "We accept a variety of payment methods, including credit cards, cash on delivery, and M-pesa." },
  { question: "What is your return policy?", answer: "You can return any item within 30 days of purchase." },
];

function FAQsPage() {
  const [showFAQs, setShowFAQs] = useState(false);

  const toggleFAQs = () => {
    setShowFAQs(!showFAQs);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <button onClick={toggleFAQs} style={{ padding: "10px 20px", cursor: "pointer" }}>
        {showFAQs ? "Hide FAQs" : "Get help from frequently asked questions"}
      </button>
      
      {showFAQs && (
        <div className="faq-list" style={{ marginTop: "20px", textAlign: "left", maxWidth: "600px", margin: "20px auto" }}>
          {faqData.map((faq, index) => (
            <FAQ key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}
    </div>
  );
}

function FAQ({ question, answer }) {
  return (
    <div style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px" }}>
      <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{question}</div>
      <div>{answer}</div>
    </div>
  );
}

export default FAQsPage;