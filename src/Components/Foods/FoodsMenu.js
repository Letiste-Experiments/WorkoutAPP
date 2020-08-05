import React, {useState} from 'react'
import {Link, Redirect, Route, Switch} from "react-router-dom"
import {useDebounce} from 'use-debounce'
import {
  Grid,
  TextField,
  Button,
  Tabs,
  Tab,
  AppBar,

} from "@material-ui/core/esm";
import MyFoods from "./MyFoods";
import Foods from "./Foods";
import MyMeals from "./MyMeals"


function ButtonPage({pageNumber, lastPage, changePage}) {
  return (
    <Grid item xs={10} style={{marginTop: 10}}>
      {pageNumber > 0 && <Button
        color={"primary"} variant={"contained"}
        style={{width: '12ch'}} onClick={() => {
        changePage(pageNumber - 1)
        window.scrollTo(0, 0)

      }}>
        Previous
      </Button>}
      {" "}
      {pageNumber < lastPage && <Button
        color={"primary"} variant={"contained"} style={{width: '12ch'}} onClick={() => {
        changePage(pageNumber + 1)
        window.scrollTo(0, 0)

      }}>
        Next
      </Button>}
    </Grid>
  )
}

function FoodsTabs({setSearch, setPageNumber}) {
  const [value, setValue] = useState(0)
  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar style={{zIndex: 0}} position={"static"}>
      <Tabs value={value} onChange={(e, newValue) => {
        handleChangeTabs(e, newValue)
        setSearch("")
        setPageNumber(0)
      }} aria-label="simple tabs example" centered>
        <Tab
          component={Link}
          to={"/foods"}
          label="Foods"/>
        <Tab
          component={Link}
          to={"/foods/myfoods"}
          label="My Foods"
        />
        <Tab
          component={Link}
          to={"/foods/mymeals"}
          label="My Meals"/>
      </Tabs>
    </AppBar>
  )
}


export default function FoodsMenu({loggedIn}) {
  const [search, setSearch] = useState("")
  const [searchDebounce] = useDebounce(search, 150)
  const [pageNumber, setPageNumber] = useState(0)
  const [lastPage, setLastPage] = useState(0)

  function RedirectTo({redirection, condition, children, ...rest}) {
    return (
      <>{loggedIn !== null &&
      <Route
        {...rest}
        render={({location}) =>
          condition ? (<Redirect exact to={{pathname: redirection, state: {from: location}}}/>) : (children)}
      />
      }</>
    );
  }

  function handleSearch(e) {
    setSearch(e.target.value)
    setPageNumber(0)
  }

  return (
    <Grid
      container
      spacing={0}
      alignItems={"center"}
      direction={"column"}
      justify={"center"}
      style={{marginTop: 0}}
    >

      {loggedIn && (<FoodsTabs setSearch={setSearch} setPageNumber={setPageNumber}/>)}

      <Grid item xs={10} style={{marginTop: 30}}>
        <TextField
          label="Search..."
          type="search"
          value={search}
          variant={"outlined"}
          onChange={handleSearch}
        />
      </Grid>

      <ButtonPage pageNumber={pageNumber} lastPage={lastPage} changePage={setPageNumber}/>

      <Switch>
        <Route exact path={"/foods"}>
          <Foods userid={loggedIn} pageNumber={pageNumber} search={searchDebounce} setLastPage={setLastPage}/>
        </Route>

        <RedirectTo path={"/foods/myfoods"} redirection={"/login"} condition={!loggedIn}>
          <MyFoods userid={loggedIn} pageNumber={pageNumber} search={searchDebounce} setLastPage={setLastPage}/>
        </RedirectTo>

        <RedirectTo path={"/foods/mymeals"} redirection={"/login"} condition={!loggedIn}>
          <MyMeals userid={loggedIn} pageNumber={pageNumber} search={searchDebounce} setLastPage={setLastPage}/>
        </RedirectTo>
      </Switch>

      <ButtonPage pageNumber={pageNumber} lastPage={lastPage} changePage={setPageNumber}/>

    </Grid>
  )
}
