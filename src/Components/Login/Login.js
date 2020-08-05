import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import {
  Button,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  Input,
  InputLabel,
  FormControl,
} from '@material-ui/core/esm'
import {Alert} from "@material-ui/lab";
import SessionDataService from "../../services/SessionService"
import {Visibility, VisibilityOff} from "@material-ui/icons";

function handleChange(e, setValue) {
  setValue(e.target.value)
}


export default function Login({handleLogin, handleWindowResize}) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")

  const history = useHistory()
  

  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleSubmit() {
    setError("")
    const data = {email: email, password: password, rememberMe: rememberMe}
    SessionDataService.create(data)
      .then(() => {
        handleLogin()
        history.push("/")
      })
      .catch(err => {
          if (err.response) {
            setError(err.response.data.message)
          } else {
            setError("No response from the server")
          }
        }
      )
  }

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      direction="column"
      justify="center"
      style={{marginTop: 20}}>

      <Grid item xs={12}>
        <Typography variant="h4">
          <strong>Login</strong>
        </Typography>
      </Grid>

      <Grid item xs={8}>
        {error.length > 0 &&
        <Alert variant={"filled"} severity={"error"} style={{marginTop: 10}}>
          {error}
        </Alert>
        }
      </Grid>

      <Grid item xs={8}>
        <TextField
          autoComplete={"email"}
          label={"Email Address"}
          value={email}
          type={"email"}
          margin={"dense"}
          onChange={(e) => handleChange(e, setEmail)}
          style={{width: '20ch'}}
        />
      </Grid>

      <Grid item xs={7}>
        <FormControl style={{width: '20ch'}}>
          <InputLabel>Password</InputLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>

      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => {
              setRememberMe(e.target.checked)
            }}
            color="primary"
          />
        }
        label="Remember me"
      />

      <Grid item xs={8} style={{marginTop: 25}}>
        <Button color={"primary"} variant={"contained"} onClick={handleSubmit}>
          Login
        </Button>
      </Grid>

    </Grid>
  )
}
