import { Box, Grid, IconButton, Rating, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

//styled rating pour changer la couleur des icones
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#1976d2',
  }
});

//composant qui affiche un produit pour la vue grille
const ProductGrid = ({product}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} sx={{padding: 2}}>
      <Box sx={{
        width: '100%',
        paddingTop: '100%', // 1:1 aspect ratio
        position: 'relative',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 1,
          borderRadius: 1,
          borderColor: "#C2C2C2"
        }}>
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{height: 1}}
          >
            {/* NAME */}
            <Box>
              <h4>{product.name}</h4>
            </Box>
            {/* DESCRIPTION */}
            <Box sx={{fontSize: 12, textAlign: "center"}}>
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
        </Box>
      </Box>
    </Grid>
  )
}

export default ProductGrid