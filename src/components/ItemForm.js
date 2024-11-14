// import React, { useState } from 'react';

// const UpdateItemForm = () => {
//   const [itemId, setItemId] = useState('');
//   const [updatedFields, setUpdatedFields] = useState({});
//   const [responseMessage, setResponseMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleFieldChange = (field, value) => {
//     setUpdatedFields({
//       ...updatedFields,
//       [field]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!itemId || Object.keys(updatedFields).length === 0) {
//       setErrorMessage('Please provide the item ID and at least one field to update.');
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:8001/api/items/${itemId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedFields),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setResponseMessage('Item updated successfully');
//         setUpdatedFields({});
//         setItemId('');
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || 'Error occurred while updating the item.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setErrorMessage('An unexpected error occurred.');
//     }
//   };

//   return (
//     <div className="update-item-form">
//       <h2>Update Item by ID</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {responseMessage && <p className="success-message">{responseMessage}</p>}

//       <form onSubmit={handleSubmit}>
//         <label>
//           Item ID:
//           <input
//             type="text"
//             value={itemId}
//             onChange={(e) => setItemId(e.target.value)}
//             required
//           />
//         </label>

//         <label>
//           Field Name:
//           <input
//             type="text"
//             placeholder="Field name (e.g., name)"
//             onChange={(e) => handleFieldChange(e.target.value, '')}
//             required
//           />
//         </label>

//         <label>
//           New Value:
//           <input
//             type="text"
//             placeholder="New value"
//             onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
//             required
//           />
//         </label>

//         <button type="submit">Update Item</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateItemForm;

import React, { useState } from 'react';
import './Modal.css'; // Include custom CSS for modal styling

const UpdateItemForm = () => {
  const [itemId, setItemId] = useState('');
  const [updatedFields, setUpdatedFields] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFieldChange = (field, value) => {
    setUpdatedFields({
      ...updatedFields,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemId || Object.keys(updatedFields).length === 0) {
      setErrorMessage('Please provide the item ID and at least one field to update.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8001/api/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage('Item updated successfully');
        setUpdatedFields({});
        setItemId('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error occurred while updating the item.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Update Item Modal</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>&times;</button>
            <h2>Update Item by ID</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {responseMessage && <p className="success-message">{responseMessage}</p>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="itemId">Item ID:</label>
                <input
                  id="itemId"
                  type="text"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fieldName">Field Name:</label>
                <input
                  id="fieldName"
                  type="text"
                  placeholder="Field name (e.g., name)"
                  onChange={(e) => handleFieldChange(e.target.value, '')}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newValue">New Value:</label>
                <input
                  id="newValue"
                  type="text"
                  placeholder="New value"
                  onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
                  required
                />
              </div>

              <button type="submit">Update Item</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateItemForm;
