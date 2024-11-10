import React from 'react';


const OrderTracking = () => {
  return (
    <div className="ordersupport-container">
      <h1>ElectroHub Order Tracking</h1>
      <p>
        At ElectroHub, we understand how important it is to stay updated on the status of your order. Our Order Tracking system allows you to monitor the progress of your purchase, from when it leaves our warehouse to when it reaches your doorstep. Below, you will find everything you need to know about tracking your order and what to do if you face any issues.
      </p>

      <h2>How to Track Your Order</h2>
      <p>
        Tracking your order is simple and can be done in just a few easy steps:
      </p>
      <ul>
        <li>Go to the Order Tracking page on our website.</li>
        <li>Enter your <strong>Order Number</strong> and <strong>Registered Email Address</strong> in the respective fields.</li>
        <li>Click on the <strong>"Track Order"</strong> button to view the latest status of your order.</li>
      </ul>
      <p>
        The tracking page will display real-time updates, including your order’s current location, shipping status, and estimated delivery time.
      </p>

      <h2>What Information Will You See?</h2>
      <p>
        After entering your order details, the tracking page will provide:
      </p>
      <ul>
        <li><strong>Order Status:</strong> Whether the order is being processed, packed, shipped, or delivered.</li>
        <li><strong>Shipping Progress:</strong> Real-time updates showing where your order is along the journey to you.</li>
        <li><strong>Delivery Timeframe:</strong> An estimated delivery date based on the current progress of your order.</li>
        <li><strong>Tracking Number:</strong> If your order has been dispatched, the tracking number from the carrier (e.g., FedEx, UPS) will be available for you to use on the courier’s tracking platform.</li>
      </ul>
      <p>
        You can access this information at any time until your order is delivered.
      </p>

      <h2>If Your Order Is Delayed</h2>
      <p>
        If you notice that your order is delayed or if the tracking information has not been updated for an extended period, don't worry. Here’s what to do:
      </p>
      <ul>
        <li><strong>Check for Updates:</strong> Sometimes, there might be brief pauses in the tracking progress due to logistical reasons. Please check back after a few hours to see if the information has been updated.</li>
        <li><strong>Contact Support:</strong> If the tracking information shows that your order is delayed beyond the expected timeframe, or if it hasn’t moved for more than 24 hours, please reach out to our customer support team for further assistance.</li>
      </ul>
      <p>
        You can contact us through the following methods:
      </p>
      <ul>
        <li><strong>Email Support:</strong> Send us an email at <a href="mailto:support@electrohub.com">support@electrohub.com</a>.</li>
        <li><strong>Phone:</strong> Call us at <strong>0746 890 567 </strong>.</li>
        <li><strong>Whatsapp:</strong> Reach us on <strong>0724 856 856</strong> or <strong>0726 144 344</strong>.</li>
        <li><strong>Live Chat:</strong> Use our live chat feature on the website to talk to a representative immediately.</li>
      </ul>

      <h2>What to Do If Your Order Is Missing</h2>
      <p>
        If your tracking information indicates that your order has been delivered, but you haven’t received it, follow these steps:
      </p>
      <ul>
        <li><strong>Check for Delivery Confirmation:</strong> Sometimes, carriers may leave packages with neighbors, or in hidden spots around your property. Check around your premises carefully.</li>
        <li><strong>Contact the Courier:</strong> If you are unable to find the package, contact the delivery service (e.g., FedEx, UPS) directly. They may have more detailed information or be able to help you locate it.</li>
        <li><strong>Notify ElectroHub:</strong> If you still cannot find the order, contact us immediately at <a href="mailto:support@electrohub.com">support@electrohub.com</a> with your order number and tracking details. We will initiate an investigation with the courier service to locate your package.</li>
      </ul>

      <h2>Track Multiple Orders</h2>
      <p>
        If you have multiple orders and want to track them all at once, you can:
      </p>
      <ul>
        <li>Visit our Order Tracking page.</li>
        <li>Enter the order number for each purchase one by one and track them individually.</li>
      </ul>
      <p>
        We are working on a feature that will allow you to track multiple orders in a consolidated view, and it will be available soon.
      </p>

      <h2>Tracking International Orders</h2>
      <p>
        If your order is being shipped internationally, you can still track it using the same tracking process. However, please note the following:
      </p>
      <ul>
        <li><strong>Different Shipping Carrier:</strong> International orders may be handled by different carriers, so your tracking page may show updates from multiple couriers.</li>
        <li><strong>Longer Transit Times:</strong> International shipments often take longer due to customs processing and long-distance travel. Please allow extra time for delivery.</li>
        <li><strong>Customs Delays:</strong> Occasionally, international shipments may be delayed at customs. If this happens, the carrier may provide an estimated clearance time.</li>
      </ul>

      <h2>Order Tracking FAQ</h2>
      <p>Below are answers to some common questions about tracking your order:</p>
      <ul>
        <li><strong>Q: Why is my order not updating in the tracking system?</strong><br />A: Tracking information is updated by the courier and may not reflect in real-time. Please wait 24-48 hours for the system to update.</li>
        <li><strong>Q: My order shows delivered, but I haven't received it. What should I do?</strong><br />A: Check with neighbors, hidden areas around your home, or the courier for confirmation. If you still can't find it, contact our support team immediately.</li>
        <li><strong>Q: Can I track multiple orders at once?</strong><br />A: You can track each order individually right now, but a consolidated tracking page will be available soon.</li>
      </ul>

      <h2>Important Notes:</h2>
      <ul>
        <li>Once an order is marked as “delivered” in the tracking system, it is the responsibility of the customer to ensure the item is received. ElectroHub is not responsible for lost or stolen items once marked delivered.</li>
        <li>If the courier service has made a mistake, such as delivering to the wrong address, we will work with them to resolve the issue promptly.</li>
        <li>In case of further delays or issues with tracking, we will always keep you informed and provide alternative solutions whenever possible.</li>
      </ul>

      <p>
        If you need any additional help tracking your order, please do not hesitate to contact our support team. We are here to make sure you have a smooth and hassle-free shopping experience.
      </p>
    </div>
  );
};

export default OrderTracking;