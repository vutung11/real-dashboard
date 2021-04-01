import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Real from "components/Real/Real.js";
import { Link } from "react-router-dom";

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
    <React.Fragment>
    <Grid container justify="flex-end" style={{ paddingBottom:20 }}>
      <Link to="add"><Button variant="contained" color="primary">Thêm Nhà</Button></Link>
    </Grid>
    <Grid container justify="flex-start" spacing={spacing}>
      {[0, 1, 2, 3].map((value) => (
        <Grid xs={3} key={value} item>
          {/* <Paper className={classes.paper} /> */}
          <Real />
        </Grid>
      ))}
    </Grid>
    </React.Fragment>
  );
}
