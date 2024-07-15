import React, { useCallback, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

//Composant qui gère la modal pour créer/éditer un produit
//prend en paramère un produit (si mode édition)
const ProductForm = ({ selectedProduct, open, handleClose, handleCreate }) => {
  //si mode édition on récupère le produit sélectionné sinon on init à vide
  const [product, setProduct] = useState(() => {
    if(selectedProduct === null){
      return(
        {
          id: 0,
          code: '',
          name: '',
          description: '',
          price: 0,
          quantity: 0,
          inventoryStatus: '',
          category: '',
          image: '',
          rating: 0
        }
      )
    }else{
      return selectedProduct
    }
  }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedProduct === null ) handleCreate(product, "new")
    if(selectedProduct !== null ) handleCreate(product, "edit")
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 600,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        overflow: 'auto',
        maxHeight: '90vh'
      }}>
        {/* titre de la modal */}
        <Typography variant="h6" component="h2">
          {selectedProduct === null &&
            <p>Create Product</p>
          }
          {selectedProduct !== null &&
            <p>Edit Product {product.name}</p>
          }
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* id */}
          <TextField
            sx={{display: "none"}}
            fullWidth
            margin="normal"
            label="ID"
            name="id"
            value={product.id}
          />
          {/* code */}
          <TextField
            fullWidth
            margin="normal"
            label="Code"
            name="code"
            value={product.code}
            onChange={handleChange}
          />
          {/* name */}
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          {/* description */}
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          {/* price */}
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          {/* quantity */}
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleChange}
          />
          {/* inventory status */}
          <TextField
            fullWidth
            margin="normal"
            label="Inventory Status"
            name="inventoryStatus"
            value={product.inventoryStatus}
            onChange={handleChange}
          />
          {/* category */}
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
          {/* <TextField
            fullWidth
            margin="normal"
            label="Image"
            name="image"
            value={product.image}
            onChange={handleChange}
          /> */}
          {/* submit */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2
          }}>
            <Button type="submit" variant="contained" color="primary">
            {selectedProduct === null &&
              <span>Create</span>
            }
            {selectedProduct !== null &&
              <span>Edit</span>
            }
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ProductForm;
