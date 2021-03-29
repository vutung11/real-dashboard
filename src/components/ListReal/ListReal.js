import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Real from "components/Real/Real.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 400,
    width: "100%",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <Grid container justify="center" spacing={spacing}>
      {[0, 1, 2, 3].map((value) => (
        <Grid xs={3} key={value} item>
          {/* <Paper className={classes.paper} /> */}
          <Real />
        </Grid>
      ))}
    </Grid>
  );
}
