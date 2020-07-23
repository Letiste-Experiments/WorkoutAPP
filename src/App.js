import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { createMuiTheme } from '@material-ui/core/styles';
import {
  ThemeProvider,
} from '@material-ui/core/esm';

import BottomNavBar from './Components/BottomNavBar/BottomNavBar'
import TopNavBar from './Components/TopNavBar/TopNavBar';
import Homepage from './Components/Homepage/Homepage'
import Foods from './Components/Foods/Foods'
import Signup from './Components/Signup/Signup'
import Exercises from './Components/Exercises/Exercises'
import Login from './Components/Login/Login'


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
    <Router>
      <ThemeProvider theme={theme}>
        <TopNavBar handleLoggedIn={handleLoggedIn} loggedIn={loggedIn} />

        <BottomNavBar loggedIn={loggedIn} />





        <Switch>
          <Route exact path={"/"} render={(props) => <Homepage {...props} loggedIn={loggedIn} />}  />
          <Route exact path={"/signup"} component={Signup} />
          <Route exact path={"/foods"} component={Foods} />
          <Route exact path={"/exercises"} component={Exercises} />
          <Route exact path={"/login"} component ={Login} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
