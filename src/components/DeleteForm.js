import React, { useState } from 'react';
import './Modal.css';

const DeleteItemForm = () => {
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemId || !itemName) {
      setErrorMessage('Please fill in both the item ID and item name.');
      return;
    }

    const confirmation = window.confirm(`Are you sure you want to delete the item "${itemName}" with ID ${itemId}?`);
    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5555/api/items/item_id/${itemId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage(result.message || `Item "${itemName}" with ID ${itemId} has been deleted successfully.`);
        setItemId('');
        setItemName('');
      } else {
        setErrorMessage(result.message || 'Error deleting item.');
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Delete Item Modal</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Close button */}
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2>Delete Item</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {responseMessage && <p className="success-message">{responseMessage}</p>}

            <form onSubmit={handleSubmit} className="delete-item-form">
              <div className="form-group">
                <label htmlFor="item_id">Item ID:</label>
                <input
                  type="number"
                  id="item_id"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="item_name">Item Name:</label>
                <input
                  type="text"
                  id="item_name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-button">Delete Item</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteItemForm;
