import React from 'react';

const Warranty = () => {
  return (
    <div className="warranty-container">
      <h1>ElectroHub Warranty Policy</h1>
      <p>
        At ElectroHub, we believe in offering not only cutting-edge technology but also peace of mind with 
        every purchase. Our products are backed by a comprehensive warranty, ensuring that you can enjoy your electronics with confidence. Below, you'll find detailed information on what’s covered, exclusions, and how to make a warranty claim.
      </p>

      <h2>What’s Covered</h2>
      <p>
        ElectroHub provides warranty coverage for the following product categories:
      </p>
      <ul>
        <li><strong>Smartphones</strong></li>
        <li><strong>PCs & Laptops</strong></li>
        <li><strong>Tablets</strong></li>
        <li><strong>Smartwatches</strong></li>
        <li><strong>TVs & Sound Systems</strong></li>
        <li><strong>Audio Devices</strong> (Headphones, Speakers)</li>
      </ul>

      <h2>Warranty Coverage Details</h2>
      <p>
        Our warranty covers defects in materials or workmanship. If your product experiences any issues that fall under this coverage, we’ll repair or replace it at no cost. This includes:
      </p>
      <ul>
        <li>Defects in manufacturing or materials that cause the product to malfunction.</li>
        <li>Functionality issues that prevent the product from performing as intended.</li>
        <li>Failure of the product under normal use, in accordance with the product’s instructions and guidelines.</li>
      </ul>

      <h2>Exclusions</h2>
      <p>While we stand behind the quality of our products, there are some circumstances that are not covered by our warranty:</p>
      <ul>
        <li>Damage caused by accidents, misuse, or unauthorized repairs.</li>
        <li>Normal wear and tear, including cosmetic damage such as scratches, dents, or cracks.</li>
        <li>Damage resulting from exposure to water, fire, lightning, or other environmental factors.</li>
        <li>Damage from using the product in ways not intended by the manufacturer (e.g., incorrect voltage or power surges).</li>
        <li>Consumable parts such as batteries or ear cushions (unless the failure is due to a manufacturing defect).</li>
        <li>Repairs or services performed by anyone other than ElectroHub or an authorized repair center.</li>
      </ul>

      <h2>Warranty Period by Product Category</h2>
      <p>The warranty period is determined by the product category, as shown below:</p>
      <div className="table-container">
      <table className="warranty-table">
        <thead>
          <tr>
            <th>Product Category</th>
            <th>Warranty Period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Smartphones</td>
            <td>2 Years</td>
          </tr>
          <tr>
            <td>PCs & Laptops</td>
            <td>2 Years</td>
          </tr>
          <tr>
            <td>Tablets</td>
            <td>1 Year</td>
          </tr>
          <tr>
            <td>Smartwatches</td>
            <td>1 Year</td>
          </tr>
          <tr>
            <td>TVs & Sound Systems</td>
            <td>2 Years</td>
          </tr>
          <tr>
            <td>Audio Devices (Headphones, Speakers)</td>
            <td>6 Months</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2>How to Make a Warranty Claim</h2>
      <p>We want to make the warranty claim process as smooth as possible. If you experience an issue with your product that falls under the warranty, follow these steps:</p>
      <ol>
        <li>Visit our Contact Support page to reach our customer service team.</li>
        <li>Provide your proof of purchase (receipt or order number) and a brief description of the issue.</li>
        <li>Our support team will review your request and guide you through the next steps.</li>
        <li>If the issue is covered under warranty, we’ll arrange for repair, replacement, or a refund, depending on the situation.</li>
      </ol>

      <h2>Warranty Claims FAQ</h2>
      <p>If you have any questions or need more information about the warranty, feel free to check out the answers to some frequently asked questions below:</p>
      <ul>
        <li><strong>Q: How long do I have to file a warranty claim?</strong><br />A: You must file a claim within the warranty period, which starts from the date of purchase.</li>
        <li><strong>Q: Can I get a replacement if my product is defective?</strong><br />A: Yes, if the product is covered by warranty and meets our criteria, we will provide a replacement or repair.</li>
        <li><strong>Q: Is there a warranty on accessories?</strong><br />A: Yes, we offer a limited warranty on accessories such as chargers, headphones, and cables, typically covering defects in material or workmanship.</li>
      </ul>

      <h2>Important Notes</h2>
      <ul>
        <li>The warranty is valid only in the country of purchase.</li>
        <li>Keep your receipt and proof of purchase, as it is required to make a warranty claim.</li>
        <li>Warranty claims for products not purchased through ElectroHub or authorized resellers may not be eligible for coverage.</li>
      </ul>

      <p>We’re committed to ensuring that your ElectroHub products provide lasting satisfaction. If you have any concerns or need assistance, please don’t hesitate to contact us.</p>
    
    </div>
  );
};

export default Warranty;