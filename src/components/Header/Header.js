import { Avatar, Stack } from '@mui/material'
import React from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

//composant qui affiche la personne connectée
export const Header = () => {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
      height={50}
      sx={{pr:2}}
    >
      <p>John Doe</p>
      <Avatar sx={{backgroundColor: "#F5F5F5"}} style={{border: "1px solid #2251B1"}}>
        <PersonRoundedIcon sx={{color: "#2251B1"}}/>
      </Avatar>
    </Stack>
  )
}
