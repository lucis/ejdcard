import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: '"DM Sans", sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1B4D3E',
    },
    secondary: {
      main: '#C4A35A',
    },
    background: {
      default: '#F7F5F0',
      paper: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 10,
  },
})
