import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core/esm'

import {
  Restaurant as RestaurantIcon,
  FitnessCenter as FitnessCenterIcon,
  AccountCircle as AccountCircleIcon
} from '@material-ui/icons'

import './BottomNavBar.css'

const windowHeight = window.innerHeight

export default function BottomNavBar({windowResize, loggedIn}) {
  const [value, setValue] = useState(-1)
  const [windowResized, setWindowResized] = useState(true)
  

  window.addEventListener('resize', () => {

    if (window.innerHeight < windowHeight) {
      setWindowResized(false)
    } else {
      setWindowResized(true)
    }
  })

  return (<>{windowResized &&

    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels

      className="bottomNavBar"
    >
      {loggedIn &&
      <BottomNavigationAction
        component={Link}
        to="/profile"
        label="Profile"
        icon={<AccountCircleIcon/>}
      />
      }

      <BottomNavigationAction
        component={Link}
        to="/foods"
        label="Foods"
        icon={<RestaurantIcon/>}/>

      <BottomNavigationAction
        component={Link}
        to="/exercises"
        label="Exercises"
        icon={<FitnessCenterIcon/>}/>


    </BottomNavigation>
    }
    </>
  )
}

