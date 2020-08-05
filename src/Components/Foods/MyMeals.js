import React, {useEffect, useState} from 'react'
import DataUserService from '../../services/UserService'
import DataMealService from '../../services/MealService'
import {
  Grid,
  List,
  Fab,
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
  Dialog,
  DialogTitle

} from "@material-ui/core/esm";
import {Add as AddIcon, ExpandMore as ExpandMoreIcon, Delete as DeleteIcon} from "@material-ui/icons"
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

function MealList({meal, foods, setDeletedMeal, deletedMeal}) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  return (
    <Accordion style={{width: '35ch'}} TransitionProps={{unmountOnExit: true}} expanded={expanded === meal.id}
               onChange={handleChange(meal.id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <IconButton
          edge="start"
          onClick={(event) => {
            event.stopPropagation()
            DataMealService.remove(meal.id)
              .then(() => setDeletedMeal(!deletedMeal))
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

export default function MyFoods({userid, pageNumber, search, setLastPage}) {

  const [meals, setMeals] = useState([])
  const [foods, setFoods] = useState([])
  const [deletedMeal, setDeletedMeal] = useState(false)
  const [open, setOpen] = useState(false)


  useEffect(() => {
    function retrieveMyMeals(page, search) {
      DataUserService.getMeals(userid, page, search)
        .then(res => {
          const nextMeals = res.data.meals
          setMeals(nextMeals)
          console.log("MEALS", nextMeals)
          setLastPage(res.data.lastPage)
          const nextFoods = []
          let nextFood
          // Promise to let finish adding all the foods before setting it
          let prom = new Promise((resolve, reject) => {
            nextMeals.forEach(async (meal, index) => {
              nextFood = await DataMealService.getFoods(meal.id)
              nextFoods.push(nextFood.data)
              if (index === nextMeals.length - 1) resolve()
            })
          })
          prom.then(() => {
            console.log("NEXT", nextFoods)
            setFoods(nextFoods)
          })
        })
        .catch(err => console.log("ERR", err.message))
    }

    retrieveMyMeals(pageNumber, search)
  }, [search, pageNumber, userid, setLastPage, deletedMeal])

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }


  return (
    <>
      {foods.length > 0 && (<Grid item xs={10}>
        <List>
          {meals.map((meal, index) => (
            <MealList key={meal.id} foods={foods[index]} meal={meal} deletedMeal={deletedMeal}
                      setDeletedMeal={setDeletedMeal}/>
          ))}
        </List>
      </Grid>)}
      < Fab style={{position: 'absolute', bottom: 80, right: 20}} color="primary" aria-label="add"
            onClick={handleClickOpen}>
        <AddIcon/>
      </Fab>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>
          Create a Meal
        </DialogTitle>
        <DialogContent dividers>
          loutre
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"primary"}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}