import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import {useState} from 'react';
import { NavbarItem } from './NavbarItem';
import { useTheme } from '@emotion/react';

//Composant navbar
function Navbar(props){
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false); //détecte si mobile ou pas (à partir d'une certaine taille d'écran)

  //gère le changement d'affichage en fonction de la taille d'écran
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const CustomDrawer = ({theme}) => {
    return(
      <div style={{padding:10}}>
        {/* nom de l'entreprise en haut du menu */}
        <Box sx={{
          display:{lg: "block", xs: "none"},
          textAlign: "center",
          color: theme.palette.text.secondary
        }}>
          <h1>Alten shop</h1>
        </Box>
        <Divider variant="middle"/>
        {/* liste des pages */}
        <List>
          <NavbarItem title={"Products"} url={"products"} icon={<ShoppingCartRoundedIcon/>}/>
          <NavbarItem title={"Admin"} url={"admin/products"} icon={<SupervisorAccountRoundedIcon/>}/>
        </List>
    </div>
    )
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{
            position:"fixed",
            width: { lg: 250 },
            height: "100vh",
            flexShrink: { lg: 0 }
          }}
          aria-label=""
        >
          {/* Mobile Drawer */}
          <Drawer
            container={container}
            variant="persistent"
            open={true}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: {
                backgroundColor: theme.palette.primary.main,
              }
            }}
            sx={{
              display: { xs: 'block', lg: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 100 },
            }}
          >
            <CustomDrawer theme={theme}/>
          </Drawer>
          {/* non mobile drawer */}
          <Drawer
            variant="persistent"
            anchor="left"
            PaperProps={{
              sx: {
                backgroundColor: theme.palette.primary.main,
              }
            }}
            sx={{
              display: { xs: 'none', lg: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
            }}
            open={true}
          >
            <CustomDrawer theme={theme}/>
          </Drawer>
        </Box>
      </Box>
  );

}

export default Navbar;