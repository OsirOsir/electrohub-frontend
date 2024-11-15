import React, { useState } from 'react';
import './Modal.css'; 

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    item_features: '',
    item_price: '',
    item_image_url: '',
    item_category: '',
    items_in_stock: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form field change
  const handleFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.item_name || !formData.item_features || !formData.item_price || !formData.item_image_url || !formData.item_category || !formData.items_in_stock) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const itemData = {
      item_name: formData.item_name,
      item_features: formData.item_features,
      item_price: formData.item_price,
      item_image_url: formData.item_image_url,
      item_category: formData.item_category,
      items_in_stock: formData.items_in_stock,
    };

    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Item added successfully!');
        setFormData({
          item_name: '',
          item_features: '',
          item_price: '',
          item_image_url: '',
          item_category: '',
          items_in_stock: '',
        });
      } else {
        setErrorMessage(result.message || 'Error adding item');
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Add New Item</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2>Add New Item</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {responseMessage && <p className="success-message">{responseMessage}</p>}

            <form onSubmit={handleSubmit} className="add-item-form">
              <div className="form-group">
                <label htmlFor="item_name">Item Name:</label>
                <input
                  type="text"
                  id="item_name"
                  value={formData.item_name}
                  onChange={(e) => handleFieldChange('item_name', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="item_features">Item Features:</label>
                <input
                  type="text"
                  id="item_features"
                  value={formData.item_features}
                  onChange={(e) => handleFieldChange('item_features', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="item_price">Item Price:</label>
                <input
                  type="number"
                  id="item_price"
                  value={formData.item_price}
                  onChange={(e) => handleFieldChange('item_price', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="item_image_url">Item Image URL:</label>
                <input
                  type="url"
                  id="item_image_url"
                  value={formData.item_image_url}
                  onChange={(e) => handleFieldChange('item_image_url', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="item_category">Item Category:</label>
                <input
                  type="text"
                  id="item_category"
                  value={formData.item_category}
                  onChange={(e) => handleFieldChange('item_category', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="items_in_stock">Items in Stock:</label>
                <input
                  type="number"
                  id="items_in_stock"
                  value={formData.items_in_stock}
                  onChange={(e) => handleFieldChange('items_in_stock', e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-button">Add Item</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItemForm;
