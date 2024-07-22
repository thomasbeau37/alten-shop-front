import { useTheme } from '@emotion/react';
import { Box } from '@mui/material'
import React from 'react'
import { useMatches } from "react-router-dom";

//composant dans la doc de react router breadcrumb, sert à afficher la route actuel
export const Breadcrumb = () => {
  const theme = useTheme();
  let matches = useMatches();
  let crumbs = matches
  // first get rid of any matches that don't have handle and crumb
  .filter((match) => Boolean(match.handle?.crumb))
  // now map them into an array of elements, passing the loader
  // data to each one
  .map((match) => match.handle.crumb(match.data));

  return (
    <Box sx={{fontWeight: "bold", p:2, backgroundColor: theme.palette.container.background, height: 50}}>
        {crumbs.map((crumb, index) => (
          <span key={index}>{crumb}</span>
        ))}
    </Box>
  );
}
