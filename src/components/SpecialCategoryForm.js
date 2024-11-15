import React, { useState } from 'react';
import './Modal.css';

const SpecialCategoryForm = () => {
  const [itemName, setItemName] = useState('');
  const [categoryName, setCategoryName] = useState('Daily deals'); // Default value for the dropdown
  const [action, setAction] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = action === 'add'
      ? 'http://localhost:8001/api/item/add_special_category'
      : 'http://localhost:8001/api/item/remove_special_category';

    const requestBody = {
      item_name: itemName,
      special_category_name: categoryName,
    };

    fetch(url, {
      method: action === 'add' ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${action === 'add' ? 'Added to' : 'Removed from'} special category successfully`);
        setItemName('');
        setCategoryName('Daily deals'); // Reset to default
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error occurred while processing the request.');
      });
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Special Category Form</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
            <form onSubmit={handleSubmit}>
              <h2>{action === 'add' ? 'Add to' : 'Remove from'} Special Category</h2>

              <div className="form-group">
                <label htmlFor="itemName">Item Name:</label>
                <input
                  id="itemName"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="categoryName">Special Category Name:</label>
                <select
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                >
                  <option value="Daily deals">Daily deals</option>
                  <option value="Best Sellers">Best Sellers</option>
                  <option value="Hot & New">Hot & New</option>
                  <option value="Season Offers">Season Offers</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="action">Action:</label>
                <select
                  id="action"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                >
                  <option value="add">Add to Special Category</option>
                  <option value="remove">Remove from Special Category</option>
                </select>
              </div>

              <button type="submit">
                {action === 'add' ? 'Add Item' : 'Remove Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecialCategoryForm;
