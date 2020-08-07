import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import {createMuiTheme} from '@material-ui/core/styles';
import {
  ThemeProvider,

} from '@material-ui/core/esm';

import BottomNavBar from './Components/BottomNavBar/BottomNavBar'
import TopNavBar from './Components/TopNavBar/TopNavBar'
import Homepage from './Components/Homepage/Homepage'
import {FoodsMenu} from './Components/Foods/FoodsMenu'
import Signup from './Components/Signup/Signup'
import Exercises from './Components/Exercises/Exercises'
import Login from './Components/Login/Login'
import Profile from './Components/Profile/Profile'
import SessionDataService from "./services/SessionService"


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
  const [windowResize, setWindowResize] = useState(true)
  const [loggedIn, setLoggedIn] = useState(null)


  function handleLogOut() {
    SessionDataService.forget()
      .then(getSession)
  }

  function handleWindowResize(bool) {
    setWindowResize(bool)
  }

  function getSession() {
    SessionDataService.get()
      .then(res => {
        setLoggedIn(res.data.message)
      })
      .catch(err => {
        setLoggedIn(false)
      })
  }

  useEffect(() => {
    getSession()
  }, [loggedIn])

  // A wrapper for <Route> that redirects to the homepage
// screen if you're already authenticated.
  function RedirectTo({redirection, condition, children, ...rest}) {
    return (
      <>
        {loggedIn !== null &&
        <Route
          {...rest}
          render={({location}) =>
            condition ? (
              <Redirect exact to={{
                pathname: redirection, state: {from: location}
              }}
              />
            ) : (
              children
            )
          }
        />
        }
      </>

    );
  }


  return (
    <Router>
      <ThemeProvider theme={theme}>
        <TopNavBar handleLogOut={handleLogOut} loggedIn={loggedIn}/>

        <BottomNavBar loggedIn={loggedIn} windowResize={windowResize}/>

        <Switch>

          <Route exact path={"/"}>
            <Homepage loggedIn={loggedIn}/>
          </Route>

          <RedirectTo path={"/signup"} redirection={"/"} condition={loggedIn}>
            <Signup handleLogin={getSession} handleWindowResize={handleWindowResize}/>
          </RedirectTo>

          <RedirectTo path={"/login"} redirection={"/"} condition={loggedIn}>
            <Login handleLogin={getSession} handleWindowResize={handleWindowResize}/>
          </RedirectTo>


          <RedirectTo path={"/profile"} redirection={"/login"} condition={!loggedIn}>
            <Profile/>
          </RedirectTo>

          <Route path={"/foods"}>
            <FoodsMenu loggedIn={loggedIn}></FoodsMenu>
          </Route>

          <Route exact path={"/exercises"} component={Exercises}/>


        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
