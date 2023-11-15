// ProductComponent.js
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const AjouterFilieres = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Send newProduct data to the Laravel backend
      await axios.post('/api/products', newProduct);

      // Fetch updated products from the Laravel backend
      const response = await axios.get('/api/products');
      setProducts(response.data);

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      {/* Display the list of products */}
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}

      {/* Button to trigger the modal */}
      <Button variant="primary" onClick={handleShowModal}>
        Add Product
      </Button>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        {/* Modal content */}
        {/* ... (previous modal code) */}
        <Modal.Body>
          {/* Form to add a new product */}
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </div>
            {/* Add other form fields as needed */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AjouterFilieres;
