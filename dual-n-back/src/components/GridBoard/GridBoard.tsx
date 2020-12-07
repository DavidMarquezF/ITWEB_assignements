import { Grid, GridSize, Paper } from "@material-ui/core";
import React from "react";
import { useStyles } from "./GrudBoard.styles";
const GRID_SIZE = 3;
interface Props {
  selectedTile: number;
}
export const GridBoard: React.FC<Props> = ({ selectedTile }) => {
  const classes = useStyles();
  const size: GridSize = (12 / GRID_SIZE) as GridSize;
  return (
    /*<div className={classes.root}>
      <Grid container spacing={3}>
        {[...Array(GRID_SIZE*GRID_SIZE)].map((x, i) => (
          <Grid item xs={size}>
            <Paper className={[classes.paper, ...selectedTile === i ? [classes.selectedPaper] : []].join(" ")}></Paper>
          </Grid> 
        ))}

      </Grid>
    </div>*/
     <div className={classes.root}>
        {[...Array(GRID_SIZE)].map((x, i) => (
          <div className={classes.fxHorizontal} key={i}>
            {[...Array(GRID_SIZE)].map((y, j) => (
              <Paper className={[classes.paper, ...selectedTile === i * 3 + j ? [classes.selectedPaper] : []].join(" ")}></Paper>
            ))}
          </div>
        ))}
      </div>
  )
};