import React from 'react'

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";

export default function Food({food}) {


  return (
    <>
      {food && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{width: '25ch'}} align="left">Name</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">Calories (Kcal)</TableCell>
                <TableCell align="right">{food.energy}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Protein (g)</TableCell>
                <TableCell align="right">{food.protein}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Carbs (g)</TableCell>
                <TableCell align="right">{food.carbohydrates}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{textIndent: 15}} align="left">Sugars (g)</TableCell>
                <TableCell align="right">{food.carbohydrates_sugar}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Fat (g)</TableCell>
                <TableCell align="right">{food.fat}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{textIndent: 15}} align="left">Saturated (g)</TableCell>
                <TableCell align="right">{food.fat_saturated}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Fibres (g)</TableCell>
                <TableCell align="right">{food.fibres}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Sodium (g)</TableCell>
                <TableCell align="right">{food.sodium}</TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}