import React from 'react'
import {Grid, Typography, Button} from "@material-ui/core/esm";
import {AccountCircle as AccountCircleIcon} from '@material-ui/icons'

export default function Profile() {
  const weight = 73
  const height = 180
  const age = 20
  const mc = Math.round(13.707 * weight + 492.3 * height / 100 - 6.673 * age + 77.607)
  return (
    <Grid
      container
      alignItems={"center"}
      direction={"column"}
      justify={"center"}
      style={{marginTop: 20}}
    >

      <Grid item xs={10}>
        <AccountCircleIcon color={"primary"} style={{fontSize: 50}}/>
      </Grid>

      <Grid item xs={10}>
        <Typography variant={"body1"}>
          First name Last Name
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <Typography variant={"body1"}>
          Email@example.com
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <Typography variant={"body1"}>
          Age M Weight
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <Typography variant={"body1"}>
          {`Maintenance calories : ${mc} Kcal`}
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <Button
          color={"primary"}
          variant={"filled"}
        >
          Workouts
        </Button>
      </Grid>


    </Grid>
  )
}