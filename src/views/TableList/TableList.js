import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import axios from "axios";
import { API_KEY } from "../../shared/_constant";
import { API_KEY_IMG } from "../../shared/_constant";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CustomInput from "components/CustomInput/CustomInput.js";

import Pagination from "@material-ui/lab/Pagination";

TableList.propTypes = {};

const styles = {
  imgUrl: {
    width: `30px`,
    height: `30px`,
  },
  overFlow: {
    overflow: `hidden`,
  },
  userList: {
    backgroundImage: `linearGradient(to bottom #018994, #007882)`,
  },
  items: {
    paddingTop: `1%`,
    borderBottom: `1px solid #C9D4D4`,
  },
};

const PagiStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(10),
      marginRight: "auto",
      marginLeft: "auto",
    },
  },
}));
const useStyles = makeStyles(styles);

function TableList(props) {
  const classes = useStyles();
  const [realData, setRealData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, SetCurrentPage] = useState(1);
  const [RealPerPage] = useState(7);
  const IndexLastPost = currentPage * RealPerPage;
  const IndexFirstPost = IndexLastPost - RealPerPage;

  const PaginateStyle = PagiStyle();

  const SearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await axios.get(`${API_KEY}/khach_hang`);
        const Data = data.data.khach_hang;
        setRealData(Data);
        // console.log(Data);
        const results = Data.filter((item) => {
          let itemContent = `${item.email}/${item.sdt}/${item.ho_ten}/${item.dia_chi}/${item.ngay_tao}`;
          return (
            itemContent
              .toLocaleLowerCase()
              .indexOf(searchTerm.toLocaleLowerCase()) != -1
          );
        });
        setSearchResults(results);
      } catch (error) {
        console.log("Failed to fetch post list:", error.message);
      }
    };

    fetchApi();
  }, [searchTerm]);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // const handleDeleteUser = (dataReal) => {
  //     console.log(dataReal);
  //     const index = realData.findIndex(x => x.id === dataReal.id)
  //     // const newID = value.id
  //     // console.log(newID);
  // };

  const handleDeleteUser = (e) => {
    const id = e.target.getAttribute("name");
    if (id) {
      if (window.confirm("Bạn có muốn xóa user này?")) {
        setRealData(realData.filter((value) => value.id != id));

        axios.delete(API_KEY + "/khach_hang/" + id).then((res) => {
          console.log(res);
        });
      }
    }

    // const index = realData.findIndex(x => x.id === newID);
    // if (index < 0) return;
    // console.log(index);
  };

  let history = useHistory();
  const handleUpdateClick = (value) => {
    history.push("/admin/user/" + value.id);
  };
  const ChangePagination = (event, value) => {
    SetCurrentPage(value);
  };

  const NumberPage = Math.ceil(searchResults.length / RealPerPage);

  return (
    <div>
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
            onChangeSearch={SearchChange}
          />
        </div>
      </Grid>
      <GridContainer container>
        <GridItem xs={2} sm={2} md={2}>
          <b className={classes.overFlow}>Email</b>
        </GridItem>
        <GridItem xs={2} sm={2} md={2}>
          <b className={classes.overFlow}>Số Điện Thoại</b>
        </GridItem>
        <GridItem xs={2} sm={2} md={2}>
          <b className={classes.overFlow}>Họ Tên</b>
        </GridItem>
        <GridItem xs={2} sm={2} md={2}>
          <b className={classes.overFlow}>Địa Chỉ</b>
        </GridItem>
        <GridItem xs={2} sm={2} md={2}>
          <b className={classes.overFlow}>Avatar</b>
        </GridItem>
        <GridItem xs={2} sm={2} md={2}></GridItem>
      </GridContainer>
      {/* <GridContainer>
                <GridItem xs={1} sm={1} md={1}>
                    {realData.id && realData.id ? realData.id : ''}
                </GridItem>
            </GridContainer> */}
      {searchResults.slice(IndexFirstPost, IndexLastPost).map((value) => (
        <div className={classes.items}>
          <GridContainer container key={value.id} text-align-center>
            <GridItem xs={2} sm={2} md={2}>
              <p className={classes.overFlow}>{value.email}</p>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <p className={classes.overFlow}>{value.sdt}</p>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <p className={classes.overFlow}>{value.ho_ten}</p>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <p className={classes.overFlow}>{value.dia_chi}</p>
            </GridItem>
            <GridItem xs={1} sm={1} md={1}>
              <p className={classes.overFlow}>
                <img
                  className={classes.imgUrl}
                  src={API_KEY_IMG + value.avatar}
                />
              </p>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdateClick(value)}
              >
                <EditIcon />
              </Button>
              <Button name={value.id} onClick={handleDeleteUser}>
                <DeleteIcon />
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      ))}
      <div className={PaginateStyle.root}>
        <Pagination
          className="custom-paginate"
          count={NumberPage}
          page={currentPage}
          onChange={ChangePagination}
        />
      </div>
    </div>
  );
}

export default TableList;
