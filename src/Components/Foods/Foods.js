import React, {useEffect, useState} from 'react'
import FoodList from "../Foods/FoodList";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import DataFoodService from "../../services/FoodService";

export default function MyFoods({userid, pageNumber, search, setLastPage}) {


  const [foods, setFoods] = useState([])


  useEffect(() => {
    function retrieveFoods(page, search) {
      DataFoodService.getAll(page, search)
        .then(res => {
          setFoods(res.data.data)
          setLastPage(res.data.lastPage)
        })
        .catch(err => console.log(err))
    }

    retrieveFoods(pageNumber, search)
  }, [search, pageNumber, setLastPage])


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