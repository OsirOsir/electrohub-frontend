import React, { useState } from 'react';
import './Modal.css';

const UpdateItemForm = () => {
  const [formData, setFormData] = useState({
    new_item_id: '', 
    new_item_name: '',
    new_item_features: '',
    new_item_price: '',
    new_item_image_url: '',
    new_item_category: '',
    new_items_in_stock: '',
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

    if (!formData.item_id || !formData.new_item_name || !formData.new_item_features || !formData.new_item_price || !formData.new_item_image_url || !formData.new_item_category || !formData.new_items_in_stock) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const itemData = {
      item_name: formData.new_item_name,
      item_features: formData.new_item_features,
      item_price: formData.new_item_price,
      item_image_url: formData.new_item_image_url,
      item_category: formData.new_item_category,
      items_in_stock: formData.new_items_in_stock,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/items/${formData.item_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Item updated successfully!');
        setFormData({
          item_id: '',
          new_item_name: '',
          new_item_features: '',
          new_item_price: '',
          new_item_image_url: '',
          new_item_category: '',
          new_items_in_stock: '',
        });
      } else {
        setErrorMessage(result.message || 'Error updating item');
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Update Item Modal</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2>Update Item</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {responseMessage && <p className="success-message">{responseMessage}</p>}

            <form onSubmit={handleSubmit} className="update-item-form">
              <div className="form-group">
                <label htmlFor="item_id">Item ID:</label>
                <input
                  type="text"
                  id="item_id"
                  value={formData.item_id}
                  onChange={(e) => handleFieldChange('item_id', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_name">Item Name:</label>
                <input
                  type="text"
                  id="new_item_name"
                  value={formData.new_item_name}
                  onChange={(e) => handleFieldChange('new_item_name', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_features">Item Features:</label>
                <input
                  type="text"
                  id="new_item_features"
                  value={formData.new_item_features}
                  onChange={(e) => handleFieldChange('new_item_features', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_price">Item Price:</label>
                <input
                  type="number"
                  id="new_item_price"
                  value={formData.new_item_price}
                  onChange={(e) => handleFieldChange('new_item_price', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_image_url">Item Image URL:</label>
                <input
                  type="url"
                  id="new_item_image_url"
                  value={formData.new_item_image_url}
                  onChange={(e) => handleFieldChange('new_item_image_url', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_category">Item Category:</label>
                <input
                  type="text"
                  id="new_item_category"
                  value={formData.new_item_category}
                  onChange={(e) => handleFieldChange('new_item_category', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_items_in_stock">Items in Stock:</label>
                <input
                  type="number"
                  id="new_items_in_stock"
                  value={formData.new_items_in_stock}
                  onChange={(e) => handleFieldChange('new_items_in_stock', e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-button">Update Item</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateItemForm;
