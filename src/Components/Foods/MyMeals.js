import React, {useEffect, useState} from 'react'
import DataUserService from '../../services/UserService'
import DataMealService from '../../services/MealService'
import {
  Grid,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,


} from "@material-ui/core/esm";
import {Add as AddIcon, ExpandMore as ExpandMoreIcon, Delete as DeleteIcon} from "@material-ui/icons"
import CreateMeal from "./CreateMeal";

function MealList({meal, foods, index, removeMeal}) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Accordion style={{width: '35ch'}} TransitionProps={{unmountOnExit: true}} expanded={expanded === meal.id}
               onChange={handleChange(meal.id)}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon/>}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <IconButton
          edge="start"
          onClick={(event) => {
            event.stopPropagation()

          }}
          onFocus={(event) => event.stopPropagation()}
        >
          <AddIcon/>
        </IconButton>

        <IconButton
          edge="start"
          onClick={(event) => {
            event.stopPropagation()
            DataMealService.remove(meal.id)
              .then(() => removeMeal(index))
              .catch(err => console.log(err.message))
          }}
          onFocus={(event) => event.stopPropagation()}
        >
          <DeleteIcon/>
        </IconButton>


        <p>{meal.name}</p>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {foods.map(food => (
                <TableRow key={food.id}>
                  <TableCell align={"left"}>{food.name}</TableCell>
                  <TableCell align={"right"}>{food.MealFoods.quantity}(g)</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}


export default function MyMeals({userid, pageNumber, search, setLastPage}) {

  const [meals, setMeals] = useState([])
  const [foods, setFoods] = useState([])
  const [deletedMeal, setDeletedMeal] = useState(false)
  const [mealCreated, setMealCreated] = useState(false)

  function handleMealCreated() {
    setMealCreated(!mealCreated)
  }

  useEffect(() => {
    function retrieveMyMeals(page, search) {
      setMeals([])
      setFoods([])
      DataUserService.getMeals(userid, page, search)
        .then(res => {
          const nextMeals = res.data.meals
          const nextFoods = []
          let nextFood
          // Promise to let finish adding all the foods before setting it
          let prom = new Promise((resolve, reject) => {
            nextMeals.forEach(async (meal, index) => {
              nextFood = await DataMealService.getFoods(meal.id)
              nextFoods.push(nextFood.data)
              if (nextFoods.length === nextMeals.length) resolve()
            })
          })
          prom.then(() => {
            setMeals(nextMeals)
            setLastPage(res.data.lastPage)
            setFoods(nextFoods)
          })
        })
        .catch(err => console.log("ERR", err.message))
    }

    retrieveMyMeals(pageNumber, search)
  }, [search, pageNumber, userid, setLastPage, deletedMeal, mealCreated])

  function removeMeal(index) {
    const nextMeals = meals.slice("")
    nextMeals.splice(index, 1)
    setMeals(nextMeals)
  }

  return (
    <>
      {foods.length > 0 && (<Grid item xs={10}>
        <List>
          {meals.map((meal, index) => (
            <MealList key={meal.id} foods={foods[index]} meal={meal} deletedMeal={deletedMeal}
                      setDeletedMeal={setDeletedMeal} index={index} removeMeal={removeMeal}/>
          ))}
        </List>
      </Grid>)}
      <CreateMeal handleMealCreated={handleMealCreated}/>
    </>
  )
}