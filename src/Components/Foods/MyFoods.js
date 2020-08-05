import React, {useEffect, useState} from 'react'
import DataUserService from '../../services/UserService'
import FoodList from "./FoodList";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";


export default function MyFoods({userid, pageNumber, search, setLastPage}) {

  const [foods, setFoods] = useState([])


  useEffect(() => {
    function retrieveMyFoods(page, search) {
      DataUserService.getFoods(userid, page, search)
        .then(res => {
          setFoods(res.data.foods)
          setLastPage(res.data.lastPage)
        })
        .catch(err => console.log("ERR", err.message))
    }

    retrieveMyFoods(pageNumber, search)
  }, [pageNumber, search, setLastPage, userid])


  return (
    <Grid item xs={10}>
      <List>
        {foods.map(food => (
          <FoodList key={food.id} food={food} loggedIn={userid}/>
        ))}
      </List>
    </Grid>
  )
}