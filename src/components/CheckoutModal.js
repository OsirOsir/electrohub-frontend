import React, { useState } from 'react';
import './CheckoutModal.css';

const CheckoutModal = ({ onClose, orderDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [invoice, setInvoice] = useState(null);

  // Payment details state
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [errors, setErrors] = useState([]);

  // Luhn algorithm to validate card number
  const validateCardNumber = (cardNumber) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Validate expiration date (MM/YY)
  const validateExpirationDate = (date) => {
    const [month, year] = date.split('/').map((part) => parseInt(part, 10));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Only the last two digits
    const currentMonth = currentDate.getMonth() + 1;
    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  // Check for errors in the inputs
  const validateForm = () => {
    const newErrors = [];
    
    if (paymentMethod === 'Credit Card') {
      if (!creditCardInfo.cardNumber || !validateCardNumber(creditCardInfo.cardNumber)) {
        newErrors.push('Invalid credit card number');
      }
      if (!creditCardInfo.expirationDate || !validateExpirationDate(creditCardInfo.expirationDate)) {
        newErrors.push('Invalid expiration date');
      }
      if (!creditCardInfo.cvv || creditCardInfo.cvv.length !== 3) {
        newErrors.push('CVV must be 3 digits');
      }
    }

    if (paymentMethod === 'PayPal') {
      if (!paypalEmail || !/\S+@\S+\.\S+/.test(paypalEmail)) {
        newErrors.push('Invalid PayPal email');
      }
    }

    if (paymentMethod === 'Bank Transfer') {
      if (!bankAccount || bankAccount.length < 10) {
        newErrors.push('Invalid bank account number');
      }
    }

    if (paymentMethod === 'M-Pesa') {
      if (!mpesaNumber || !/^(\+254|254|0)[7-9]\d{8}$/.test(mpesaNumber)) {
        newErrors.push('Invalid M-Pesa number');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Generate random billing info
  const generateBillingInfo = () => {
    const addresses = [
      "123 Elm Street, Nairobi",
      "456 Oak Avenue, Mombasa",
      "789 Pine Lane, Kisumu"
    ];
    return {
      name: "John Doe",
      address: addresses[Math.floor(Math.random() * addresses.length)],
      phone: `+2547${Math.floor(100000000 + Math.random() * 900000000)}`
    };
  };

  // Create the invoice
  const createInvoice = () => {
    const billing = generateBillingInfo();
    
    const newInvoice = {
      invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      totalAmount: orderDetails?.totalAmount || "0.00",
      items: orderDetails?.items || [],
      billing,
      paymentMethod,  // Include the payment method in the invoice
    };

    setInvoice(newInvoice);
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!validateForm()) return;

    // Generate invoice before payment confirmation
    createInvoice();

    // Simulate payment process based on payment method
    let paymentMessage = '';
    let paymentStatus = '';
    switch (paymentMethod) {
      case 'Credit Card':
        paymentMessage = `Payment made with Credit Card ending in ${creditCardInfo.cardNumber.slice(-4)}`;
        paymentStatus = 'Payment Successful';
        break;
      case 'PayPal':
        paymentMessage = `Payment made with PayPal account ${paypalEmail}`;
        paymentStatus = 'Payment Successful';
        break;
      case 'Bank Transfer':
        paymentMessage = `Bank transfer initiated from account ${bankAccount}`;
        paymentStatus = 'Payment Pending';
        break;
      case 'M-Pesa':
        paymentMessage = `M-Pesa payment initiated for ${mpesaNumber}. Awaiting confirmation...`;
        paymentStatus = 'Payment Pending';
        break;
      default:
        paymentMessage = 'Payment method not selected';
        paymentStatus = 'Payment Failed';
    }
    alert(paymentMessage);

    // Simulate actual payment success
    alert(`Payment Status: ${paymentStatus}`);

    onClose(); // Close modal after payment
  };

  return (
    <div className="checkout-modal">
      <h2>Checkout</h2>

      {/* Payment Form */}
      <form onSubmit={handlePaymentSubmit}>
        <label>Choose a payment method:</label>
        <select value={paymentMethod} onChange={handlePaymentChange}>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="M-Pesa">M-Pesa</option>
        </select>

        {/* Payment method details */}
        {paymentMethod === 'Credit Card' && (
          <div>
            <label>Card Number</label>
            <input
              type="text"
              value={creditCardInfo.cardNumber}
              onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cardNumber: e.target.value })}
              required
            />
            <label>Expiration Date (MM/YY)</label>
            <input
              type="text"
              value={creditCardInfo.expirationDate}
              onChange={(e) => setCreditCardInfo({ ...creditCardInfo, expirationDate: e.target.value })}
              required
            />
            <label>CVV</label>
            <input
              type="text"
              value={creditCardInfo.cvv}
              onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cvv: e.target.value })}
              required
            />
          </div>
        )}

        {paymentMethod === 'PayPal' && (
          <div>
            <label>PayPal Email</label>
            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              required
            />
          </div>
        )}

        {paymentMethod === 'Bank Transfer' && (
          <div>
            <label>Bank Account Number</label>
            <input
              type="text"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              required
            />
          </div>
        )}

        {paymentMethod === 'M-Pesa' && (
          <div>
            <label>M-Pesa Mobile Number</label>
            <input
              type="text"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              required
            />
          </div>
        )}

        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error">{error}</p>
            ))}
          </div>
        )}

        <button type="submit" className="submit-button">Submit Payment</button>
        <button type="button" onClick={onClose} className="close-button">
          Cancel
        </button>
      </form>

      {/* Invoice Modal - Display after payment */}
      {invoice && (
        <div className="invoice">
          <h3>Invoice</h3>
          <p>Invoice Number: {invoice.invoiceNumber}</p>
          <p>Date: {invoice.date}</p>
          <p>Time: {invoice.time}</p>
          <p>Total Amount: ${invoice.totalAmount}</p>
          <p>Payment Method: {invoice.paymentMethod}</p>
          <p>Billing Address: {invoice.billing.address}</p>
          <p>Billing Name: {invoice.billing.name}</p>
          <p>Phone: {invoice.billing.phone}</p>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutModal;