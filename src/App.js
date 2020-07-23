import React, { useState } from 'react'
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { createMuiTheme } from '@material-ui/core/styles';
import {
  ThemeProvider,
} from '@material-ui/core/esm';

import BottomNavBar from './Components/BottomNavBar/BottomNavBar'
import TopNavBar from './Components/TopNavBar/TopNavBar';



const theme = createMuiTheme({

  palette: {
    primary: {
      main: '#689f38',
    },
    secondary: {
      main: '#9ccc65',
    },
  },

})



function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  function handleLoggedIn() {
    setLoggedIn(!loggedIn)
  }
  return (
    <ThemeProvider theme={theme}>
      <TopNavBar handleLoggedIn={handleLoggedIn} loggedIn={loggedIn}/>

      <BottomNavBar loggedIn={loggedIn}/>


    </ThemeProvider>
  );
}

export default App;
