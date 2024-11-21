import React, { useState } from 'react';
import './Modal.css';

const SpecialCategoryForm = ({ onItemSpecialCategoryClose }) => {
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState('');
  const [categoryName, setCategoryName] = useState('Daily deals');
  const [action, setAction] = useState('add');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!itemId || isNaN(itemId)) {
      setErrorMessage('Please provide a valid Item ID.');
      return;
    }
  
    const categoryMapping = {
      'Daily deals': 'daily_deals',
      'Best Sellers': 'best_sellers',
      'Hot & New': 'hot_&_new',
      'Season Offers': 'season_offers',
    };
  
    const mappedCategoryName = categoryMapping[categoryName];
  
    if (!mappedCategoryName) {
      setErrorMessage('Invalid special category name.');
      return;
    }
  
    const url = action === 'add'
      ? `http://localhost:5555/api/item/${itemId}/add_special_category`
      : `http://localhost:5555/api/item/${itemId}/remove_special_category`;
  
    const requestBody = {
      special_category_name: mappedCategoryName,
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
        if (data.message) {
          setResponseMessage(data.message);
          setItemId('');
          setItemName('');
          setCategoryName('Daily deals');
          setErrorMessage('');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Error occurred while processing the request.');
      });
  };
  
  return (
    <>
      <div className="modal-overlay">
        <div className="crud-modal-content">
          <button className="crud-form-close-button" onClick={onItemSpecialCategoryClose}>&times;</button>
          <form onSubmit={handleSubmit}>
            <div className='form-header'>
              <h2>{action === 'add' ? 'Add to' : 'Remove from'} Special Category</h2>
            </div>
            
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            {responseMessage && <p className="success-message">{responseMessage}</p>}

            <div className="form-group">
              <label htmlFor="item_id">Item ID:</label>
              <input
                id="item_id"
                type="number"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                required
                min="1"
              />
            </div>
        
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
                <option value="daily_deals">Daily deals</option>
                <option value="best_sellers">Best Sellers</option>
                <option value="hot_&_new">Hot & New</option>
                <option value="season_offers">Season Offers</option>
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

            <button type="submit">{action === 'add' ? 'Add Item' : 'Remove Item'}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SpecialCategoryForm;
