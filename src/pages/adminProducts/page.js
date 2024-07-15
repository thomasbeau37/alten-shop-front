import React, { useCallback } from 'react'
import {useEffect, useState, useMemo, useRef} from "react";
import {MaterialReactTable} from 'material-react-table';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box, Button, IconButton } from '@mui/material';
import productsData from "../../data/testData.json";
import ProductForm from './ProductForm';
import axios from 'axios';

function AdminProducts() {
  //products from json or api
	// const [products, setProducts] = useState(productsData.products)
	const [products, setProducts] = useState([])

	//for material react table
	const rowVirtualizerInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  //dialog create/edit product
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //ouverture create/edit user
  const handleOpen = useCallback((product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  },[]);

  //fermeture create/edit user
  const handleClose = useCallback(() => {
    setSelectedProduct(null)
    setDialogOpen(false);
  },[]);

  //création/édition d'un produit
  const handleCreate = async(newProduct, action) => {
    if(action === "new"){
      try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, newProduct)
        if(response.status === 200){
          setProducts([...products, response.data.data]);
        } 
      }catch(error){
        console.log(error);
      }
    }else if(action === "edit"){
      try{
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/products/${newProduct.id}`, newProduct)
        if(response.status === 200){
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === response.data.data.id ? { ...product, ...response.data.data } : product
            )
          );
        } 
      }catch(error){
        console.log(error);
      }
      
    }
  };

	//get products with API
	useEffect(() => {
		getProducts()
    //A ENLEVER SI LIEN AVEC API
    // setIsLoading(false)
	}, [])

	//scroll en haut si le sorting change
	useEffect(() => {
      try{
        rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
      }catch(error){
        console.error(error);
      }
    
  }, [sorting]);

  //récupérer les produits
  const getProducts = async() => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`)
      if(response.status === 200){
        setProducts(response.data)
        setIsLoading(false)
      } 
    }catch(error){
      console.log(error);
    }
  }

  //suppression de produits
  const deleteProducts = async() => {
    try{
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/products`, {
        data: {
          ids: Object.keys(rowSelection)
        }
      })
      if(response.status === 200){
        //vider la sélection
        setRowSelection({})
        //supprimer les produits
        setProducts((prevProducts) => prevProducts.filter(product => !response.data.products.includes(product.id.toString())));
      } 
    }catch(error){
      console.log(error);
    }
  }

  //définition des columns du tableau
  const columns = useMemo(() => [
    //CODE
    {
      accessorFn: (row) => row.code ?? "",
      id: 'code',
      header: 'Code',
      enableColumnOrdering :true,
      Cell: ({ renderedCellValue, row }) => {
        return (
          <>
            {renderedCellValue}
          </>
        )
      }
    },
    //NAME
    {
      accessorFn: (row) => row.name ?? "",
      id: 'name',
      header: 'Nom',
      enableColumnOrdering :true,
      Cell: ({ renderedCellValue, row }) => {
        return (
          <>
            {renderedCellValue}
          </>
        )
      }
    },
    //EDIT
    {
      accessorFn: (row) => row.id ?? "",
      id: 'edit',
      header: '',
      enableColumnOrdering :false,
      enableColumnActions :false,
      enableSorting: false,
      size: 10,
      Cell: ({ renderedCellValue, row }) => {
        // bouton pour éditer un produit
        return (
          <>
            <IconButton onClick={() => handleOpen(products.find(objet => objet.id === row.original.id))}>
              <EditRoundedIcon />
            </IconButton>
          </>
          )
      }
    }
	], [handleOpen, products])

	return(
		<>
      {/* modal pour créer/éditer un produit */}
      {dialogOpen &&
          <ProductForm
            selectedProduct={selectedProduct}
            open={dialogOpen}
            handleCreate={handleCreate}
            handleClose={handleClose}
          />
      }
      {/* tableau de produits */}
			<Box sx={{height: 1, maxHeight: 1, width: 1, backgroundColor: "red"}} flexGrow={1}> 
        <MaterialReactTable
          onRowSelectionChange={setRowSelection} //update state when selection changes
          getRowId={(row) => row.id}
          muiTablePaperProps={{
            sx: {
              height: "100%",
              flex: "1 1 0",
              display: "flex",
              "flex-flow": "column",
              '& tr:nth-of-type(odd) > td': {
                  backgroundColor: '#f5f5f5',
              },
            }
          }}
          muiTableContainerProps={{
            sx: {
              flex: "1 1 0"
            }
          }}
					enableRowSelection //first column checkboxes
          enableColumnVirtualization
          enableRowVirtualization
          onSortingChange={setSorting}
          state={{ rowSelection, isLoading, sorting }}
          rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
          rowVirtualizerProps={{ overscan: 5 }}
          columnVirtualizerProps={{ overscan: 2 }}
          columns={columns} 
          data={products}
          enableColumnOrdering 
					renderTopToolbarCustomActions={({ table }) => {
            // si au moins un produit sélectionné on peut afficher le bouton supprimer
            if(Object.keys(rowSelection).length > 0){
              //bouton supprimer produit
              return(
                <>
                  <Button
                    onClick={() => deleteProducts()}
                    variant="contained"
                    sx={{
                      backgroundColor: "grey",
                      "&:hover": {
                        backgroundColor: "darkgrey"
                      }
                    }}
                    startIcon={<DeleteRoundedIcon />}
                  >
                    Delete
                  </Button>
                </>
              )
            }else{
              //bouton créer un produit
              return(
                <>
                  <Button variant="contained" color="success" onClick={() => handleOpen(null)}>
                    + New
                  </Button>
                </>
              )
            }
					}}
        />
      </Box>
		</>
	)
}

export default AdminProducts