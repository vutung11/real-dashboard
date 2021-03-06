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

import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

import { API_KEY } from "../../shared/_constant";

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // str = str.replace(/\s/g, "");
  return str;
}

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
  const [realData, setRealData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const SearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [isDeleteItem, setIsDeleteItem] = useState(false);

  const [currentPage, SetCurrentPage] = useState(1);
  const [RealPerPage] = useState(8);
  const IndexLastPost = currentPage * RealPerPage;
  const IndexFirstPost = IndexLastPost - RealPerPage;

  const PaginateStyle = PagiStyle();
  const apiUrl = API_KEY;

  const typingRacing = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${apiUrl}/nha`);
        const ress = data.data.nha;
        setRealData(ress);
        const results = ress.filter((item) => {
          let itemContent = `${item.thanh_pho}/${item.phuong}/${item.quan}`;
          itemContent = removeVietnameseTones(itemContent);
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
    fetchData();
  }, [isDeleteItem, searchTerm]);

  const ChangePagination = (event, value) => {
    SetCurrentPage(value);
  };

  const NumberPage = Math.ceil(searchResults.length / RealPerPage);
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
            onChangeSearch={SearchChange}
            value={searchTerm}
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
        {searchResults.slice(IndexFirstPost, IndexLastPost).map((value) => (
          <Grid xs={3} key={value.id_nha} item>
            {/* <Paper className={classes.paper} /> */}
            <Real
              item={value}
              setIsDelete={() => setIsDeleteItem(!isDeleteItem)}
            />
          </Grid>
        ))}
      </Grid>
      <div className={PaginateStyle.root}>
        <Pagination
          className="custom-paginate"
          count={NumberPage}
          page={currentPage}
          onChange={ChangePagination}
        />
      </div>
    </React.Fragment>
  );
}
