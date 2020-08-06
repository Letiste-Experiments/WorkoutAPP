import React, {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {Add as AddIcon, ExpandMore as ExpandMoreIcon, KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import {
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Accordion,
  AccordionSummary,
  IconButton,
  AccordionDetails,
  Fab,
  Dialog,
  DialogTitle,
  Grid,
  List,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core/esm";
import {ButtonPage} from "./FoodsMenu";
import Food from "./Food";
import DataMealService from "../../services/MealService"
import DataFoodService from "../../services/FoodService";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MobileStepper from "@material-ui/core/MobileStepper";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Delete as DeleteIcon} from "@material-ui/icons"


function FoodMealList({food, addFood}) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion TransitionProps={{unmountOnExit: true}} expanded={expanded === food.id}
               onChange={handleChange(food.id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <IconButton
          edge="start"
          onClick={(event) => {
            event.stopPropagation()
            addFood(food)
          }}
          onFocus={(event) => event.stopPropagation()}
        >
          <AddIcon/>
        </IconButton>
        <p style={{fontSize: 14}}>{food.name}</p>
      </AccordionSummary>
      <AccordionDetails><Food food={food}/></AccordionDetails>
    </Accordion>
  )
}

function FoodsMeal({pageNumber, search, setLastPage, addFood}) {
  const [foods, setFoods] = useState([])


  useEffect(() => {
    function retrieveFoods(page, search) {
      DataFoodService.getAll(page, search, 10)
        .then(res => {
          setFoods(res.data.data)
          setLastPage(res.data.lastPage)
        })
        .catch(err => console.log(err))
    }

    retrieveFoods(pageNumber, search)
  }, [search, pageNumber, setLastPage])


  return (
    <Grid item xs={12}>
      <List style={{marginBottom: 40}}>
        {foods.map(food => (
          <FoodMealList key={food.id} food={food} addFood={addFood}/>
        ))}
      </List>
    </Grid>
  )
}

function StepNameMeal({name, setName}) {

  return (
    <>
      Name of the meal:
      <TextField
        label={"Name"}
        type={"text"}
        value={name}
        variant={"outlined"}
        onChange={(e) => setName(e.target.value)}
      />
    </>
  )
}

function StepAddFoods({addFood}) {
  const [search, setSearch] = useState("")
  const [searchDebounce] = useDebounce(search, 150)
  const [pageNumber, setPageNumber] = useState(0)
  const [lastPage, setLastPage] = useState(0)

  function handleSearch(e) {
    setSearch(e.target.value)
    setPageNumber(0)
  }

  return (
    <Grid
      container
      spacing={1}
      alignItems={"center"}
      direction={"column"}
      justify={"center"}
    >
      <Grid item xs={10}>
        <TextField
          label="Search..."
          type="search"
          value={search}
          variant={"outlined"}
          onChange={handleSearch}
        />
      </Grid>
      <ButtonPage pageNumber={pageNumber} lastPage={lastPage} changePage={setPageNumber}/>

      <FoodsMeal pageNumber={pageNumber} search={searchDebounce} setLastPage={setLastPage}
                 addFood={addFood}
      />
    </Grid>
  )
}

function StepSetQuantities({foods, setFoods, handleQuantity, handleUnit}) {

  function removeFood(index) {
    const nextFoods = foods.slice("")
    nextFoods.splice(index, 1)
    setFoods(nextFoods)
  }

  return (

    <List>
      {foods.map((food, index) => (
        <ListItem key={food.id} divider>
          <IconButton edge={"start"} onClick={() => removeFood(index)}>
            <DeleteIcon/>
          </IconButton>
          <Grid
            container
            spacing={1}
            alignItems={"center"}
            direction={"column"}
            justify={"center"}
          >
            <Grid item xs={12}>

              <span style={{width: "30%"}}>{food.name}</span>
            </Grid>


            <Grid item xs={12}>

              <TextField
                style={{width: 90, marginRight: 10}}
                // inputProps={{style: {fontSize: 12}}}
                // InputLabelProps={{style: {fontSize: 12}}}
                size={"small"}
                type={"number"}
                label={"Qty"}
                value={food.quantity}
                onChange={(e) => handleQuantity(e.target.value, index)}
                variant={"outlined"}
              />
              <FormControl size={"small"}>
                <InputLabel htmlFor="unit">Unit</InputLabel>
                <Select
                  id="unit" value={food.unit} size={"small"}

                  variant={"outlined"}
                  onChange={(e) => handleUnit(e.target.value, index)}
                >
                  <MenuItem value={"g"}>g</MenuItem>
                  <MenuItem value={"mg"}>mg</MenuItem>
                  <MenuItem value={"cL"}>ml</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  )
}


const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  }
})

const titles = ["Create a Meal", "Add the foods", "Set the quantities"]

export default function CreateMeal({userid}) {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState("")
  const [foods, setFoods] = useState([])
  const [activeStep, setActiveStep] = useState(0)

  const classes = useStyles()

  function handleQuantity(qty, index) {
    const nextFoods = foods.slice("")
    nextFoods[index].quantity = qty
    setFoods(nextFoods)
  }

  function handleUnit(unit, index) {
    const nextFoods = foods.slice("")
    nextFoods[index].unit = unit
    setFoods(nextFoods)
  }

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function addFood(food) {
    const nextFoods = foods.slice("")
    console.log(foods)
    if (foods.includes(food)) {
      // show danger flash
    } else {
      nextFoods.push({...food, quantity: "", unit: "g"})
    }
    setFoods(nextFoods)
  }

  return (
    <>
      < Fab style={{position: 'absolute', bottom: 80, right: 20}} color="primary" aria-label="add"
            onClick={handleClickOpen}>
        <AddIcon/>
      </Fab>
      <Dialog maxWidth={"md"} fullWidth onClose={handleClose} open={open}
              classes={{paper: classes.dialogPaper}}>
        <DialogTitle onClose={handleClose}>
          {titles[activeStep]}
        </DialogTitle>

        <DialogContent>
          {activeStep === 0 && <StepNameMeal name={name} setName={setName}/>}
          {activeStep === 1 && <StepAddFoods addFood={addFood}/>}
          {activeStep === 2 &&
          <StepSetQuantities foods={foods} setFoods={setFoods} handleQuantity={handleQuantity}
                             handleUnit={handleUnit}/>}
          <MobileStepper
            variant={"dots"}
            steps={3}
            style={{position: 'absolute'}}

            activeStep={activeStep}
            nextButton={activeStep < 2 ? (
              <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
                Next
                <KeyboardArrowRight/>
              </Button>) : (
              <Button size={"small"} color={"primary"} variant={"contained"}>
                Create
              </Button>
            )
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft/>
                Back
              </Button>
            }
          />


        </DialogContent>
      </Dialog>
    </>
  )
}
