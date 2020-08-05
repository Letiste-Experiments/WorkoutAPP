import React, { useState } from 'react'
import { Button, Snackbar } from '@material-ui/core/esm'
import { Link } from 'react-router-dom'
import UserDataService from "../../services/UserService"
import { Alert } from '@material-ui/lab'

export default function Homepage(props) {

  const [data, setData] = useState([])
  const [open, setOpen] = useState(true)

  const wrapper = React.createRef()

  const handleClose = (event, reason) => {
    props.handleSignedUp()
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function retrieveUsers() {
    UserDataService.getAll()
      .then(res => {
        console.log("LOUTRE", res.data)
        manageUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function manageUsers(nextUsers) {
    const nextData = []
    nextUsers.map(user => (
      nextData.push(
        <p key={user.id}>{`${user.firstname} ${user.lastname}`}</p>
      )
    ))
    setData(nextData)
  }

  function ShowUsers() {
    return data
  }
  return (
    <>
      {
        props.loggedIn ? (
          <div>
            You are logged in.
          </div>
        ) : (<>{
          props.signedUp ? (<>
            {
              <Snackbar ref={wrapper} open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert ref={wrapper} onClose={handleClose} severity="success" variant="filled">
                  Sucessfully signed up !
                </Alert>
              </Snackbar>
            }
          </>) : (


              <Button
                component={Link}
                to="signup"
                color="primary"
              >
                Sign up
              </Button>
            )
        }
        </>)
      }
      <Button
        color="primary"
        onClick={retrieveUsers}
      >
        Retrieve Users
    </Button>
      <ShowUsers />
    </>
  )
}