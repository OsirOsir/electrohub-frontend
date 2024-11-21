import React, { useState } from 'react';
import './CheckoutModal.css';

const CheckoutModal = ({ onClose, orderDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [invoice, setInvoice] = useState(null);
  const [isInvoiceVisible, setIsInvoiceVisible] = useState(false);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [errors, setErrors] = useState([]);
  const [orderStatus, setOrderStatus] = useState('Packing');  // Default status

  // Helper functions for validation
  const validateCardNumber = (cardNumber) => /^\d{16}$/.test(cardNumber);
  const validateExpirationDate = (expirationDate) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    if (!regex.test(expirationDate)) return false;
    const [month, year] = expirationDate.split('/').map(num => parseInt(num, 10));
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  const validateForm = () => {
    const newErrors = [];

    // Validate based on payment method
    switch (paymentMethod) {
      case 'Credit Card':
        if (!creditCardInfo.cardNumber || !validateCardNumber(creditCardInfo.cardNumber)) {
          newErrors.push('Invalid credit card number');
        }
        if (!creditCardInfo.expirationDate || !validateExpirationDate(creditCardInfo.expirationDate)) {
          newErrors.push('Invalid expiration date');
        }
        if (!creditCardInfo.cvv || creditCardInfo.cvv.length !== 3) {
          newErrors.push('CVV must be 3 digits');
        }
        break;
      case 'PayPal':
        if (!paypalEmail) newErrors.push('Invalid PayPal email');
        break;
      case 'Bank Transfer':
        if (!bankAccount || bankAccount.length < 10) newErrors.push('Invalid bank account number');
        break;
      case 'M-Pesa':
        if (!mpesaNumber || !/^(\+254|254|0)[7-9]\d{8}$/.test(mpesaNumber)) {
          newErrors.push('Invalid M-Pesa number');
        }
        break;
      default:
        newErrors.push('Invalid payment method selected');
    }

    // Validate billing details
    if (!billingDetails.name || billingDetails.name.split(' ').length < 2) {
      newErrors.push('Billing name must contain at least a first and last name');
    }
    if (!billingDetails.address || billingDetails.address.length < 5) {
      newErrors.push('Billing address is incomplete');
    }
    if (!billingDetails.phone || billingDetails.phone.length !== 10 || !/^\d{10}$/.test(billingDetails.phone)) {
      newErrors.push('Phone number must be exactly 10 digits');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const createInvoice = () => {
    const newInvoice = {
      invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      totalAmount: orderDetails?.totalAmount || '0.00',
      items: orderDetails?.items || [],
      billing: billingDetails,
      paymentMethod,
      status: orderStatus,
    };
    setInvoice(newInvoice);
    setIsInvoiceVisible(true);
  };

  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);
  const handleBillingChange = (e) => setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    createInvoice();
    setIsPaymentSubmitted(true);

    let paymentMessage = '';
    let paymentStatus = 'Payment Failed';

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
        paymentStatus = 'Payment Successful';
        break;
      case 'M-Pesa':
        paymentMessage = `M-Pesa payment initiated for ${mpesaNumber}. Awaiting confirmation...`;
        paymentStatus = 'Payment Successful';
        break;
      default:
        paymentMessage = 'Payment method not selected';
    }

    alert(`${paymentMessage}\n\nInvoice Number: ${invoice?.invoiceNumber}\nTotal: Ksh ${invoice?.totalAmount}\nPayment Status: ${paymentStatus}`);

    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="checkout-modal">
      <h2>Checkout</h2>

      <div className="billing-details">
        <label>Billing Name</label>
        <input
          type="text"
          name="name"
          value={billingDetails.name}
          onChange={handleBillingChange}
          className={errors.includes('Billing name must contain at least a first and last name') ? 'error' : ''}
        />
        <label>Billing Address</label>
        <input
          type="text"
          name="address"
          value={billingDetails.address}
          onChange={handleBillingChange}
          className={errors.includes('Billing address is incomplete') ? 'error' : ''}
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={billingDetails.phone}
          onChange={handleBillingChange}
          className={errors.includes('Phone number must be exactly 10 digits') ? 'error' : ''}
        />
      </div>

      {!isPaymentSubmitted && (
        <form onSubmit={handlePaymentSubmit}>
          <label>Choose a payment method:</label>
          <select value={paymentMethod} onChange={handlePaymentChange}>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="M-Pesa">M-Pesa</option>
          </select>

          {paymentMethod === 'Credit Card' && (
            <div className="payment-method-fields">
              <label>Card Number</label>
              <input
                type="text"
                value={creditCardInfo.cardNumber}
                onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cardNumber: e.target.value })}
                className={errors.includes('Invalid credit card number') ? 'error' : ''}
              />
              <label>Expiration Date (MM/YY)</label>
              <input
                type="text"
                value={creditCardInfo.expirationDate}
                onChange={(e) => setCreditCardInfo({ ...creditCardInfo, expirationDate: e.target.value })}
                className={errors.includes('Invalid expiration date') ? 'error' : ''}
              />
              <label>CVV</label>
              <input
                type="text"
                value={creditCardInfo.cvv}
                onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cvv: e.target.value })}
                className={errors.includes('CVV must be 3 digits') ? 'error' : ''}
              />
            </div>
          )}

          {paymentMethod === 'PayPal' && (
            <div className="payment-method-fields">
              <label>PayPal Email</label>
              <input
                type="email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className={errors.includes('Invalid PayPal email') ? 'error' : ''}
              />
            </div>
          )}

          {paymentMethod === 'Bank Transfer' && (
            <div className="payment-method-fields">
              <label>Bank Account Number</label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className={errors.includes('Invalid bank account number') ? 'error' : ''}
              />
            </div>
          )}

          {paymentMethod === 'M-Pesa' && (
            <div className="payment-method-fields">
              <label>M-Pesa Number</label>
              <input
                type="text"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
                className={errors.includes('Invalid M-Pesa number') ? 'error' : ''}
              />
            </div>
          )}

          <button type="submit">Submit Payment</button>
        </form>
      )}

      {isInvoiceVisible && invoice && (
        <div className="invoice">
          <h3>Invoice</h3>
          <p>Invoice Number: {invoice.invoiceNumber}</p>
          <p>Date: {invoice.date}</p>
          <p>Time: {invoice.time}</p>
          <p>Status: {invoice.status}</p>
          <p>Payment Method: {invoice.paymentMethod}</p>
          <p>Thank you for shopping at ShopSphere!</p>
        </div>
      )}

      <button className="close-modal" onClick={onClose}>Close</button>
    </div>
  );
};

export default CheckoutModal;