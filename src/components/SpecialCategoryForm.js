// import React, { useState } from 'react';

// const SpecialCategoryForm = ({ itemId }) => {
//   const [specialCategoryName, setSpecialCategoryName] = useState('');
//   const [action, setAction] = useState('add'); // Default action: "add"

//   const handleInputChange = (e) => {
//     setSpecialCategoryName(e.target.value);
//   };

//   const handleActionChange = (e) => {
//     setAction(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const url = action === 'add' 
//       ? `http://localhost:8001/api/item/${itemId}/add_special_category`
//       : `http://localhost:8001/api/item/${itemId}/remove_special_category`;

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ special_category_name: specialCategoryName }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         alert(data.message); // Show the response message
//         setSpecialCategoryName(''); // Clear the input field
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Error occurred while processing the request.');
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>{action === 'add' ? 'Add Special Category' : 'Remove Special Category'}</h2>

//       <label>
//         Special Category Name:
//         <input
//           type="text"
//           value={specialCategoryName}
//           onChange={handleInputChange}
//           required
//         />
//       </label>
      
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="add"
//             checked={action === 'add'}
//             onChange={handleActionChange}
//           />
//           Add to Special Category
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="remove"
//             checked={action === 'remove'}
//             onChange={handleActionChange}
//           />
//           Remove from Special Category
//         </label>
//       </div>

//       <button type="submit">{action === 'add' ? 'Add' : 'Remove'}</button>
//     </form>
//   );
// };

// export default SpecialCategoryForm;

// import React, { useState } from 'react';

// const SpecialCategoryForm = () => {
//   const [itemName, setItemName] = useState('');
//   const [categoryName, setCategoryName] = useState('');
//   const [action, setAction] = useState('add'); // Default action is 'add'

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const url = action === 'add'
//       ? 'http://localhost:8001/api/item/add_special_category'
//       : 'http://localhost:8001/api/item/remove_special_category';

//     const requestBody = {
//       item_name: itemName,
//       special_category_name: categoryName,
//     };

//     fetch(url, {
//       method: action === 'add' ? 'POST' : 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         alert(`${action === 'add' ? 'Added to' : 'Removed from'} special category successfully`);
//         setItemName(''); // Clear the input field after submission
//         setCategoryName('');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Error occurred while processing the request.');
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>{action === 'add' ? 'Add to' : 'Remove from'} Special Category</h2>

//       <label>
//         Item Name:
//         <input
//           type="text"
//           value={itemName}
//           onChange={(e) => setItemName(e.target.value)}
//           required
//         />
//       </label>

//       <label>
//         Special Category Name:
//         <input
//           type="text"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           required
//         />
//       </label>

//       <label>
//         Action:
//         <select value={action} onChange={(e) => setAction(e.target.value)}>
//           <option value="add">Add to Special Category</option>
//           <option value="remove">Remove from Special Category</option>
//         </select>
//       </label>

//       <button type="submit">{action === 'add' ? 'Add Item' : 'Remove Item'}</button>
//     </form>
//   );
// };

// export default SpecialCategoryForm;

import React, { useState } from 'react';
import './Modal.css'; 

const SpecialCategoryForm = () => {
  const [itemName, setItemName] = useState('');
  const [categoryName, setCategoryName] = useState('');
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
        setCategoryName('');
        setIsModalOpen(false); // 
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
                <input
                  id="categoryName"
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
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
