import { Box, Stack } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb'

//Layout principal du site avec menu à gauche et contenu à droite
function Layout(){
  return (
    <Stack direction={"row"} display={'flex'}>
      <Box
        sx={{ 
          width: { 
              lg: 250,
              xs: 100
          }
        }}
      >
        <Navbar />
      </Box>
      <Stack direction={"column"} flexGrow={1} sx={{backgroundColor: "#F5F5F5", maxHeight: '100vh', height: '100vh'}}>
        <Header />
        <Breadcrumb/>
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default Layout
