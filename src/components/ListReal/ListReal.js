import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Real from "components/Real/Real.js";
import { Link } from "react-router-dom";
import axios from "axios";

import Pagination from '@material-ui/lab/Pagination';

import { API_KEY } from "../../shared/_constant";

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
const PagiStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(10),
      marginRight: "auto",
      marginLeft: "auto",
    },
  },
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [realData, setRealData] = useState([])
  const [currentPage, SetCurrentPage] = useState(1);
  const [RealPerPage] = useState(4);


  const PaginateStyle = PagiStyle();

  const apiUrl = API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${apiUrl}/nha`);
        setRealData(data.data);
        console.log(data.data, '1111111111')
      } catch (error) {
        console.log('Failed to fetch post list:', error.message);
      }
    }
    fetchData();
  }, [])
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  const ChangePagination = (event, value) => {
    SetCurrentPage(value);
  };

  const IndexLastPost = currentPage * RealPerPage;
  const IndexFirstPost = IndexLastPost - RealPerPage;
  const CurrentList = realData.slice(IndexFirstPost, IndexLastPost);
  const NumberPage = Math.ceil(realData.length / RealPerPage);

  return (
    <React.Fragment>
      <Grid container justify="flex-end" style={{ paddingBottom: 20 }}>
        <Link to="add"><Button variant="contained" color="primary">Thêm Nhà</Button></Link>
      </Grid>
      <Grid container justify="flex-start" spacing={spacing}>
        {CurrentList.map((value) => (
          <Grid xs={3} key={value.id_nha} item>
            {/* <Paper className={classes.paper} /> */}
            <Real item={value} />
          </Grid>
        ))}
      </Grid>
      <div className={PaginateStyle.root}>
        <Pagination className="custom-paginate" count={NumberPage} page={currentPage} onChange={ChangePagination} />
      </div>
    </React.Fragment>
  );
}
