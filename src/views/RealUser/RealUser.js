import React from "react";
import PropTypes from "prop-types";
import ListRealUser from "components/ListRealUser/ListRealUser.js";
import ListReal from "components/ListReal/ListReal.js";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import "./RealUser.css";

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
      <ListRealUser />
    </div>
  );
};

Real.propTypes = {};

export default Real;
