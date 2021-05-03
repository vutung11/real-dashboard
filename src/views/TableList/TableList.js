import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import axios from "axios";
import { API_KEY } from "../../shared/_constant";
import { API_KEY_IMG } from "../../shared/_constant";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import blankavt from "./blankavt.jpg";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Pagination from "@material-ui/lab/Pagination";

TableList.propTypes = {};

const styles = {
  imgUrl: {
    width: `30px`,
    height: `30px`,
    borderRadius: `100px`,
  },
  overFlow: {
    overflow: `hidden`,
  },
  userList: {
    backgroundImage: `linearGradient(to bottom #018994, #007882)`,
  },
  items: {
    paddingTop: `1%`,
    borderBottom: `1px solid #018994`,
  },
  btn: {
    marginTop: `10%`,
  },
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(styles);

function TableList(props) {
  const classes = useStyles();
  const [realData, setRealData] = useState([]);
  const typingRacing = useRef(null);
  const [filterUser, setFilterUser] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await axios.get(`${API_KEY}/khach_hang`);
        setRealData(data.data.khach_hang);
        console.log(data.data.khach_hang);
      } catch (e) {
        console.log(e);
      }
    };

    fetchApi();
  }, []);

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

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align="center">Số Điện Thoại</StyledTableCell>
            <StyledTableCell align="center">Họ Tên</StyledTableCell>
            <StyledTableCell align="center">Địa Chỉ</StyledTableCell>
            <StyledTableCell align="center">Ảnh Đại Diện</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {realData.map((value) => (
            <StyledTableRow key={value.id}>
              <StyledTableCell component="th" scope="row">
                {value.email}
              </StyledTableCell>
              <StyledTableCell align="center">{value.sdt}</StyledTableCell>
              <StyledTableCell align="center">{value.ho_ten}</StyledTableCell>
              <StyledTableCell align="center">{value.dia_chi}</StyledTableCell>
              <StyledTableCell align="center">
                <img
                  className={classes.imgUrl}
                  src={!value.avatar ? blankavt : API_KEY_IMG + value.avatar}
                />
              </StyledTableCell>
              <StyledTableCell>
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
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableList;
