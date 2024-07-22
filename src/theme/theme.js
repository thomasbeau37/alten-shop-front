import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2C343B',
    },
    secondary: {
      main: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#C2C2C2',
    },
    button: {
      main: '#2251B1',
      secondary: '#2251B1',
      contrastText: '#ffffff',
    },
    navbarButton:{
      active: "#717171"
    },
    container:{
      background: "#FFFFFF"
    }
  },
});
  
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0F1214',
    },
    secondary: {
      main: '#0F171F',
    },
    text: {
      primary: '#ffffff',
      secondary: '#FFFFFF',
    },
    button: {
      main: '#2F88E1',
      secondary: '#2F88E1',
      contrastText: '#FFFFFF',
    },
    navbarButton:{
      active: "#717171"
    },
    container:{
      background: "#0F1214"
    }
  },
});
  

export { lightTheme, darkTheme };