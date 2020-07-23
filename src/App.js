import React from 'react'
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography, IconButton, ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'
import { green, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({

  palette: {
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#00897b',
    },
  },

})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles(theme);
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            News
    </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>


      <Button variant="contained" color="secondary">
        Clique sur moi !
    </Button>
    </ThemeProvider>
  );
}

export default App;
