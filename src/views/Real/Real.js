import React from "react";
import PropTypes from "prop-types";
import ListReal from "components/ListReal/ListReal.js";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import "./Real.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(10),
      marginRight: "auto",
      marginLeft: "auto",
    },
  },
}));

const Real = (props) => {
  const classes = useStyles();

  return (
    <div>
      <ListReal />
    </div>
  );
};

Real.propTypes = {};

export default Real;
