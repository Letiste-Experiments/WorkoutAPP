import React from 'react'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core/esm'
import {Link} from 'react-router-dom'

import './TopNavBar.css'

export default function TopNavBar(props) {

  return (
    <AppBar position="sticky" style={{zIndex: 10}}>
      <Toolbar>
        <Typography
          variant="h6"
          className="topnavbartitle"
        >
          <a href="/" className="homelink">WorkoutApp</a>
        </Typography>

        <>{props.loggedIn ? (
          <Button
            color="inherit"
            onClick={props.handleLogOut}
          >
            Log out
          </Button>
        ) : (
          <>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
            >
              sign up
            </Button>

            <Button
              component={Link}
              to={"/login"}
              color="inherit"
            >
              login
            </Button>
          </>

        )}
        </>


      </Toolbar>
    </AppBar>
  )
}