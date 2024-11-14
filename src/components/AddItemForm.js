// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// // Form validation schema using Yup
// const validationSchema = Yup.object({
//   item_name: Yup.string().required('Item Name is required'),
//   item_features: Yup.string().required('Item Features are required'),
//   item_price: Yup.number().required('Item Price is required').positive('Price must be a positive number'),
//   item_image_url: Yup.string().url('Invalid URL').required('Item Image URL is required'),
//   item_category: Yup.string().required('Item Category is required'),
//   items_in_stock: Yup.number().required('Items in Stock is required').integer('Must be an integer').min(0, 'Stock cannot be negative'),
// });

// const AddItemForm = () => {
//   // Handle form submission
//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     const itemData = {
//       item_name: values.item_name,
//       item_features: values.item_features,
//       item_price: values.item_price,
//       item_image_url: values.item_image_url,
//       item_category: values.item_category,
//       items_in_stock: values.items_in_stock,
//     };

//     try {
//       // Send POST request (Fetch API instead of axios)
//       const response = await fetch('http://localhost:5000/api/items', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(itemData),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert('Item added successfully!');
//         resetForm();
//       } else {
//         alert(`Error: ${result.message}`);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       alert('There was an error submitting the form');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="add-item-form">
//       <h2>Add New Item</h2>
//       <Formik
//         initialValues={{
//           item_name: '',
//           item_features: '',
//           item_price: '',
//           item_image_url: '',
//           item_category: '',
//           items_in_stock: '',
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div>
//               <label htmlFor="item_name">Item Name</label>
//               <Field type="text" id="item_name" name="item_name" />
//               <ErrorMessage name="item_name" component="div" className="error" />
//             </div>

//             <div>
//               <label htmlFor="item_features">Item Features</label>
//               <Field type="text" id="item_features" name="item_features" />
//               <ErrorMessage name="item_features" component="div" className="error" />
//             </div>

//             <div>
//               <label htmlFor="item_price">Item Price</label>
//               <Field type="number" id="item_price" name="item_price" />
//               <ErrorMessage name="item_price" component="div" className="error" />
//             </div>

//             <div>
//               <label htmlFor="item_image_url">Item Image URL</label>
//               <Field type="url" id="item_image_url" name="item_image_url" />
//               <ErrorMessage name="item_image_url" component="div" className="error" />
//             </div>

//             <div>
//               <label htmlFor="item_category">Item Category</label>
//               <Field type="text" id="item_category" name="item_category" />
//               <ErrorMessage name="item_category" component="div" className="error" />
//             </div>

//             <div>
//               <label htmlFor="items_in_stock">Items in Stock</label>
//               <Field type="number" id="items_in_stock" name="items_in_stock" />
//               <ErrorMessage name="items_in_stock" component="div" className="error" />
//             </div>

//             <div>
//               <button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? 'Submitting...' : 'Add Item'}
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AddItemForm;

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
