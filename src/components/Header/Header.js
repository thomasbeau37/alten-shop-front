import { Avatar, Stack } from '@mui/material'
import React from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CustomSwitch from './CustomSwitch';
import { useThemeContext } from '../../context/ThemeContext';
import { useTheme } from '@emotion/react';

//composant qui affiche la personne connectée
export const Header = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
      height={50}
      sx={{pr:2}}
    >
      <CustomSwitch onClick={toggleTheme}/>
      <p>John Doe</p>
      <Avatar sx={{backgroundColor: theme.palette.secondary.main}} style={{border: `1px solid ${theme.palette.button.main}`}}>
        <PersonRoundedIcon sx={{color: theme.palette.button.main}}/>
      </Avatar>
    </Stack>
  )
}
