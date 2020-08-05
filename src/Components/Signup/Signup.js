import React, {useState,} from 'react'
import {useHistory} from "react-router-dom"
import {
  InputLabel,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Grid,
  TextField
} from '@material-ui/core/esm'

import UserDataService from "../../services/UserService"
import {Alert} from "@material-ui/lab";

function handleInputChange(e, setValue) {
  setValue(e.target.value)
}

function isBlank(str) {
  return !(str.replace(/\s/g, '').length)
}

function isEmail(str) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(str.toLowerCase());
}

function SignupInput({value, text, setFunction, type, notRequired, errorMessage}) {
  return (
    <Grid item xs={8}>
      <TextField
        required={!notRequired}
        label={text}
        value={value}
        type={type}
        margin="dense"
        onChange={(e) => handleInputChange(e, setFunction)}
        error={errorMessage.length > 0}
        helperText={errorMessage}
        style={{width: '20ch'}}
      />
    </Grid>
  )
}

export default function Signup({handleLogin, handleWindowResize}) {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("M")

  const [firstnameError, setFirstnameError] = useState("")
  const [lastnameError, setLastnameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("")
  const [ageError, setAgeError] = useState("")
  const [error, setError] = useState("")

  const history = useHistory()

  const heightWindow = window.innerHeight

  console.log("SIGNUP")

  window.addEventListener('resize', () => {
    if (window.innerHeight < heightWindow) {
      handleWindowResize(false)
    } else {
      handleWindowResize(true)
    }
  })

  // Validate a value
  function validateForm(value, setValueError) {
    setValueError("")

    if (setValueError !== setAgeError && isBlank(value)) {
      setValueError("Can't be blank")
    } else if (setValueError === setEmailError && !isEmail(value)) {
      setValueError("Invalid email address")
    } else if (setValueError === setPasswordError && value.length < 6) {
      setValueError("Minimum length of 6")
    } else if (setValueError === setPasswordConfirmationError && value !== password) {
      setValueError("Passwords don't match")
    } else if (setValueError === setAgeError && value.length > 0) {
      if (isNaN(value)) {
        setValueError("Age must be an integer")
      } else if (parseInt(value) < 0) {
        setAgeError("Age can't be negative")
      }
    } else {
      return true
    }
    return false


  }

  // Check if all the values are valid and create user if so
  function handleSubmit() {
    const values = [
      [firstname, setFirstnameError],
      [lastname, setLastnameError],
      [email, setEmailError],
      [password, setPasswordError],
      [passwordConfirmation, setPasswordConfirmationError],
      [age, setAgeError]
    ]

    let valid = true
    values.forEach(([field, setfieldError]) => {
      if (!validateForm(field, setfieldError)) {
        valid = false
      }
    })

    // If valid, create the user
    if (valid) {
      console.log(valid)
      submitData()
    }
  }

  function submitData() {
    let newAge = age //handle blank age
    if (isBlank(age)) {
      newAge = null
    }
    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      age: newAge,
      gender: gender,
    }
    UserDataService.create(user)
      .then(() => {
        handleLogin()
        history.push("/")
      })
      .catch(err => {
        if (err.response && err.response.data.message === 'la valeur d\'une clé dupliquée rompt la contrainte unique « Users_email_key »') {
          setEmailError("Email already exists")
        } else {
          setError("No response from the server")
        }
      })
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
          <strong>Sign Up</strong>
        </Typography>
      </Grid>

      <Grid item xs={8}>
        {error.length > 0 &&
        <Alert variant={"filled"} severity={"error"} style={{marginTop: 10}}>
          {error}
        </Alert>
        }
      </Grid>

      <SignupInput value={firstname} text="First Name" setFunction={setFirstname} type="text"
                   errorMessage={firstnameError}/>

      <SignupInput value={lastname} text="Last Name" setFunction={setLastname} type="text"
                   errorMessage={lastnameError}/>

      <SignupInput value={email} text="Email Address" setFunction={setEmail} type="email" errorMessage={emailError}/>

      <SignupInput value={password} text="Password" setFunction={setPassword} type="password"
                   errorMessage={passwordError}/>

      <SignupInput value={passwordConfirmation} text="Password Confirmation" setFunction={setPasswordConfirmation}
                   type="password" errorMessage={passwordConfirmationError}/>

      <SignupInput value={age} text="Age" setFunction={setAge} type="text" notRequired={true} errorMessage={ageError}/>

      <Grid item xs={8}>
        <FormControl margin="dense">
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Select id="gender" value={gender} onChange={(e) => handleInputChange(e, setGender)}>
            <MenuItem value={"M"}>M</MenuItem>
            <MenuItem value={"F"}>F</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={8} style={{marginTop: 25}}>
        <Button color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
      </Grid>
    </Grid>


  )
}