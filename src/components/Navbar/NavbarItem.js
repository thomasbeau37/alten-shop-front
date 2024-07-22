import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';

//composant qui affiche un item dans la navbar pour navigation
export const NavbarItem = ({url, title, icon}) => {
  const theme = useTheme();
  return (
    <NavLink
      to={url}
      style={{ color: "#FFFFFF", textDecoration: 'none' }}
    >
      {({ isActive }) => (
        <ListItemButton
          key={title}
          sx={{
            justifyContent: { xs: "center", lg: "left" },
            backgroundColor: isActive ? theme.palette.navbarButton.active : 'inherit',
          }}
        >
          {/* ICON */}
          <ListItemIcon sx={{
            color: theme.palette.text.secondary,
            justifyContent: { xs: "center", lg: "left" }
          }}>
            {icon}
          </ListItemIcon>
          {/* TITLE */}
          <ListItemText primaryTypographyProps={{
            style: { fontSize: 14 },
            display: { lg: "block", xs: "none" }
          }}>
            <Box sx={{ fontWeight: "500", color: theme.palette.text.secondary }}>
              {title}
            </Box>
          </ListItemText>
        </ListItemButton>
      )}
    </NavLink>
  )
}
