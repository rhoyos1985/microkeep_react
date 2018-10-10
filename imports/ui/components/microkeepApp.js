import React, { Component } from 'react';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

//Components
import Navigation from './navigation/navigation.js';
import Content from '../layouts/content/content.js';


const theme = createMuiTheme({
  palette: {
    primary: { 
      main: lightBlue[500],
      contrastText: '#fff',        
    },
    secondary: { main: '#ffffff' },
    text: { main: '#ffffff' },
  },
  typography: {
    useNextVariants: true,
  },
});

export default class MicrokeepApp extends Component {
  render() {
    return(
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Navigation />
          <Content />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}