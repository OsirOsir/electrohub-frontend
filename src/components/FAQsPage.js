import React from "react";

const faqData = [
  { question: "How can i place an order?", answer: "Placing an order is easy! Simply browse our website, select the products you want, add them to your cart, and proceed to checkout."},
  { question: "How do I track my order?", answer: "Log in to your account and go to 'Order Support' to track your order." },
  { question: "Do you offer delivery services?", answer: "Yes, we offer delievry services outside Nairobi at additional charges." },
  { question: "Can I cancel my order?", answer: "You can cancel an order within 24 hours of placing it." },
  { question: "What payment methods do you accept?,", answer: "We accept a variety of payment methods, including credit cards, cash on delivery and M-pesa. Choose the one that suits you best during the checkout process."},
  { question: "What is your return policy?", answer: "You can return any item within 30 days of purchase." },
];

function FAQsPage() {
  return (
    <div>
      <h1>FAQs</h1>
      {faqData.map((faq, index) => (
        <FAQ key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}

function FAQ({ question, answer }) {
  return (
    <div>
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>{question}</div>
      <div style={{ marginBottom: "16px" }}>{answer}</div>
    </div>
  );
}

export default FAQsPage;