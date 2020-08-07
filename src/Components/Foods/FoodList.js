import React from "react";
import {Add as AddIcon, ExpandMore as ExpandMoreIcon} from "@material-ui/icons";
import DataUserService from "../../services/UserService";
import Food from "./Food";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import IconButton from "@material-ui/core/IconButton";
import AccordionDetails from "@material-ui/core/AccordionDetails";

export default function FoodList({food, loggedIn}) {
  const [expanded, setExpanded] = React.useState(false);

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
        {loggedIn && (
          <IconButton
            edge="start"
            onClick={(event) => {
              event.stopPropagation()
              const foodid = {foodid: food.id}
              DataUserService.addFood(loggedIn, foodid)
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            <AddIcon/>
          </IconButton>
        )}
        <p>{food.name}</p>
      </AccordionSummary>
      <AccordionDetails>
        <Food food={food}/>
      </AccordionDetails>
    </Accordion>

  )

}