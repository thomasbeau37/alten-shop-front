import React, { useCallback, useEffect, useState } from 'react'
import productsData from "../../data/testData.json";
import { Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Pagination, Select, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ProductGrid from '../../components/Products/ProductGrid';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import ProductList from '../../components/Products/ProductList';
import axios from 'axios';

function Products() {
  //A REMPLIR PAR JSON OU API
  // const [products, setProducts] = useState(productsData.products)
  const [products, setProducts] = useState([])
  //Produits qui sont affichés
  const [productsToDisplay, setProductsToDisplay] = useState([])
  //pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [paginationCount, setPaginationCount] = useState(1);
  const [page, setPage] = useState(1);
  //tri
  const [sortBy, setSortBy] = useState("")
  //search
  const [searchValue, setSearchValue] = useState("")
  //affichage
  const [view, setView] = useState("grid")

  //gère le changement de page
  const handleChangePage = useCallback((event, value) => {
    setPage(value);
  },[]);

  //gère le nombre de produits par page, si on le change on retourne sur la page 1 et on affiche le nouveau nombre de produits sélectionnés
  const handleChangeRows = useCallback((event) => {
    setPage(1)
    setRowsPerPage(event.target.value);
    //calcul pour le nombre de page du composant pagination
    setPaginationCount(Math.ceil(products.length/event.target.value))
  },[products]);

  const handleChangeSortBy = useCallback((event) => {
    setSortBy(event.target.value);
  },[]);
  
  const handleView = useCallback((event, value) => {
    setView(value);
  },[]);

  const handleSearchChange = useCallback((event) => {
    setSearchValue(event.target.value);
  },[]);

  //quand le nombre de produits par page ou la page change on slice le tableau de produits pour afficher les bons
  useEffect(() => {
    //si le chaine de recherche est vide
    if(searchValue !== ""){
      setProductsToDisplay(() => {
        //slice en fonction de la page et du champ de recherche
        const productsToSort = (products.slice((page-1)*(rowsPerPage), (page-1)*(rowsPerPage)+rowsPerPage).filter(product => product.name.includes(searchValue) || product.description.includes(searchValue)))
        //tri
        const sortedProducts = productsToSort.sort((a, b) => a[sortBy] - b[sortBy]);
        return sortedProducts;
      });
    }
    //si la chaine de recherche est remplie
    else{
      setProductsToDisplay(() => {
        //slice en fonction de la page et du champ de recherche
        const productsToSort = (products.slice((page-1)*(rowsPerPage), (page-1)*(rowsPerPage)+rowsPerPage))
        //tri
        const sortedProducts = productsToSort.sort((a, b) => a[sortBy] - b[sortBy]);
        return sortedProducts;
      });
    }
  },[rowsPerPage, page, searchValue, sortBy, products])

  useEffect(() => {
    getProducts()
  }, [])

  //récupérer les produits
  const getProducts = async() => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`)
      if(response.status === 200){
        setPaginationCount(Math.ceil(response.data.length/rowsPerPage))
        setProducts(response.data)
        setProductsToDisplay(response.data)
      } 
    }catch(error){
      console.log(error);
    }
  }

  return (
    <Box
      sx={{
        height: 2,
        width: 1,
        p:1,
        backgroundColor: "#F5F5F5"
      }}
      display={"flex"} 
      justifyContent="center"
      flexGrow={"1"}
    >
      <Stack
        direction={"column"}
        justifyContent="center"
        alignItems="center"
        sx={{
          width:{xs: 9/10, lg: 6/10},
          height:1,
          maxHeight: 1, 
          backgroundColor: "white",
          borderRadius: 1
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{
            height: 1/10,
            width: 1,
            p: 1
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
            sx={{width: 1/2}}
          >
            {/* SORTING */}
            <FormControl sx={{width: 1/2}}>
              <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="Sort by"
                onChange={handleChangeSortBy}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"price"}>Price</MenuItem>
                <MenuItem value={"rating"}>Rating</MenuItem>
              </Select>
            </FormControl>
            &nbsp;
            {/* SEARCHFIELD */}
            <TextField
              size="medium"
              variant="outlined"
              onChange={handleSearchChange}
              value={searchValue}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                )
              }}
          />
          </Stack>
          {/* VIEW TYPE */}
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleView}
            aria-label="text alignment"
          >
            <ToggleButton value="list" aria-label="left aligned">
              <FormatListBulletedRoundedIcon />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="centered">
              <GridViewRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {/* GRID DISPLAY */}
        {view === "grid" && 
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            sx={{width:1, height: 8/10}}
            overflow={"auto"}
          >
            {productsToDisplay.map((product) => {
              return(
                <ProductGrid product={product}/>
              )
            })}
          </Grid>
        }
        {/* LIST DISPLAY */}
        {view === "list" && 
          <Stack
            container
            direction="column"
            sx={{width:1, height: 8/10}}
            overflow={"auto"}
          >
            {productsToDisplay.map((product) => {
              return(
                <ProductList product={product}/>
              )
            })}
          </Stack>
        }
        {/* PAGINATION */}
        <Box display={"flex"} alignItems={"center"} justifyContent="center" sx={{height: 1/10}}>
          Products per page: 
          <Select
            value={rowsPerPage}
            label="Rows per page"
            onChange={handleChangeRows}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <Pagination count={paginationCount} color="primary" page={page} onChange={handleChangePage} />
        </Box>
      </Stack>
    </Box>
  )
}

export default Products