import { Box, IconButton, Rating, Stack, styled } from '@mui/material'
import React from 'react'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

//styled rating pour changer la couleur des icones
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#1976d2',
  }
});

//nom du produit responsive en taille
const ResponsiveH4 = styled('h4')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.5rem',
  },
}));

//composant qui affiche un produit pour la vue liste
const ProductList = ({product}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{border: 1, borderRadius: 1, p: 1, m:1, borderColor: "#C2C2C2"}}
    >
      {/* NAME */}
      <Box>
        <ResponsiveH4>{product.name}</ResponsiveH4>
      </Box>
      {/* DESCRIPTION */}
      <Box sx={{
        fontSize: 12,
        textAlign: "left",
        width: 4/10,
        display:{xs: "none", sm: "block"}
      }}>
        {product.description}
      </Box>
      {/* PRICE */}
      <Box sx={{fontSize: 12, fontWeight: "bold"}}>
        {product.price} €
      </Box>
      {/* RATING */}
      <Box>
        <StyledRating size="small" name="read-only" value={product.rating} readOnly />
      </Box>
      {/* ADD TO CART */}
      <Box sx={{backgroundColor: "#1976d2", borderRadius: 1}}>
        <IconButton aria-label="add to cart" sx={{color: "white"}}>
          <AddShoppingCartRoundedIcon/>
        </IconButton>
      </Box>
    </Stack>
  )
}

export default ProductList