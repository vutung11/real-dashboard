import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Real from "components/Real/Real.js";
import { Link } from "react-router-dom";
import CustomInput from "components/CustomInput/CustomInput.js";
import Search from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";

import axios from "axios";

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

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [realData, setRealData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isDeleteItem, setIsDeleteItem] = useState(false);
  const apiUrl = API_KEY;
  const typingRacing = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${apiUrl}/nha`);
        setRealData(data.data);
        setFilterData(data.data);
      } catch (error) {
        console.log("Failed to fetch post list:", error.message);
      }
    };
    fetchData();
  }, [isDeleteItem]);
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  const handleChangeSearch = (e) => {
    const value = e.target.value;

    if (typingRacing.current) {
      clearTimeout(typingRacing.current);
    }

    typingRacing.current = setTimeout(() => {
      let filter = realData.filter((item) => {
        let itemContent = `${item.thanh_pho}/${item.phuong}/${item.quan}`;
        return (
          itemContent.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !=
          -1
        );
      });
      if (value === "") {
        setFilterData(realData);
      } else {
        setFilterData(filter);
      }
    }, 300);
  };
  const handleDelete = (id) => {};

  return (
    <React.Fragment>
      <Grid container justify="flex-end" style={{ marginTop: -70 }}>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search,
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search",
              },
            }}
            onChangeSearch={handleChangeSearch}
          />
        </div>
      </Grid>
      <Grid container justify="flex-end" style={{ paddingBottom: 20 }}>
        <Link to="addproduct">
          <Button variant="contained" color="primary">
            Thêm Nhà
          </Button>
        </Link>
      </Grid>
      <Grid container justify="flex-start" spacing={spacing}>
        {filterData.map((value) => (
          <Grid xs={3} key={value.id_nha} item>
            {/* <Paper className={classes.paper} /> */}
            <Real item={value} setIsDelete = {()=>setIsDeleteItem(!isDeleteItem)} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
