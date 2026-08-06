import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import green from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { AuthProvider } from './contexts/AuthContext'
import { LoadingProvider } from './contexts/LoadingContext'

const config = {
  apiKey: 'AIzaSyD6Atam9L3DUmo_iSUagFY_XXLF2bYTPnk',
  authDomain: 'ejdcard.firebaseapp.com',
  databaseURL: 'https://ejdcard.firebaseio.com',
  projectId: 'ejdcard',
  storageBucket: '',
  messagingSenderId: '849711390322'
}

firebase.initializeApp(config)

const theme = createMuiTheme({
  palette: {
    primary: {
      light: pink[500],
      main: pink[700],
      dark: pink[900]
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Product Sans", serif'
  }
})

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <AuthProvider>
        <LoadingProvider>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...props} />
          </MuiThemeProvider>
        </LoadingProvider>
      </AuthProvider>
    )
  }

  return WithRoot
}

export default withRoot
