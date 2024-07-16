import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';

//composant qui affiche un item dans la navbar pour navigation
export const NavbarItem = ({url, title, icon}) => {
  return (
    <NavLink
      to={url}
      style={{ color: "#3A3A3C", textDecoration: 'none' }}
    >
      {({ isActive }) => (
        <ListItemButton
          key={title}
          sx={{
            justifyContent: { xs: "center", lg: "left" },
            backgroundColor: isActive ? "#717171" : 'inherit',
          }}
        >
          {/* ICON */}
          <ListItemIcon sx={{
            color: "#C2C2C2",
            justifyContent: { xs: "center", lg: "left" }
          }}>
            {icon}
          </ListItemIcon>
          {/* TITLE */}
          <ListItemText primaryTypographyProps={{
            style: { fontSize: 14 },
            display: { lg: "block", xs: "none" }
          }}>
            <Box sx={{ fontWeight: "500", color: "#C2C2C2" }}>
              {title}
            </Box>
          </ListItemText>
        </ListItemButton>
      )}
    </NavLink>
  )
}
