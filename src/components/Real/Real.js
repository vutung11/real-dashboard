import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import Gird from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import StreetviewIcon from "@material-ui/icons/Streetview";
import bgImage from "assets/img/sidebar-2.jpg";
import { API_KEY } from "../../shared/_constant";
import { API_KEY_IMG } from "../../shared/_constant";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  Checkbox,
  Container,
  TableContainer,
  TableHead,
  Button,
} from "@material-ui/core";
import {
  Delete,
  FindInPageOutlined,
  ImportExportTwoTone,
  PageviewOutlined,
  RadioButtonCheckedOutlined,
  Update,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    position: "relative",
  },
  media: {
    height: 140,
  },
  image: {
    opacity: 1,
    display: "block",
    width: "100%",
    height: "auto",
    transition: ".5s ease",
    backfaceVisibility: "hidden",
  },
  imgUrl: {
    maxWidth: "100%",
    maxHeight: "150px",
  },
  delete: {
    color: "red",
  },

  buttonCard: {
    // zIndex: "9999",
    // transition: "0.5s ease",
    // opacity: "0",
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // msTransform: "translate(-50%, -50%)",
    backgroundColor: "#C0C0C0",
  },
});

export default function MediaCard({ item, setIsDelete }) {
  // const [status, setStatus] = useState(1);

  const UpdateStatus = async (item) => {
    let trang_thai = 0;

    await axios
      .put(`http://127.0.0.1:8000/api/nha/${item.id_nha}`, {
        trang_thai: trang_thai,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    console.log(trang_thai);
  };
  const UpdateStatus2 = async (item) => {
    let trang_thai = 2;

    await axios
      .put(`http://127.0.0.1:8000/api/nha/${item.id_nha}`, {
        trang_thai: trang_thai,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    console.log(trang_thai);
  };

  useEffect(() => {
    UpdateStatus(item);
    UpdateStatus2(item);
  }, []);

  // useEffect(() => {
  //   UpdateStatus2(item);
  // }, []);

  let history = useHistory();

  const classes = useStyles();

  const handleRealClick = (item) => {
    history.push("/admin/home/" + item.id_nha);
  };
  const handleDelete = async (id) => {
    await axios.delete(`${API_KEY}/nha/${id}`);
    setIsDelete();
  };
  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.image}
        onClick={() => handleRealClick(item)}
      >
        <img
          style={{ width: "100%" }}
          className={classes.imgUrl}
          src={API_KEY_IMG + item.banner}
        />
        <CardContent>
          <Typography variant="h6" component="h1">
            {item.loai_nha +
              "/ " +
              item.gia +
              " tỷ" +
              "/ " +
              item.dien_tich +
              "m2"}
          </Typography>
          {/* <Typography variant="h6" component="h2">
            {item.gia + " tỷ" + " / " + item.dien_tich + "m2"}
          </Typography> */}
          <Typography gutterBottom variant="body2" component="h2">
            {item.quan + ", Thành Phố " + item.thanh_pho}
          </Typography>

          {/* <Typography variant="h5" component="h2">
            {item.dien_tich + "m2 / " + item.hinh_thuc}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonCard}>
        <Button color="white" type="submit" onClick={() => UpdateStatus(item)}>
          Ẩn Tin
        </Button>
        <Button color="white" type="submit" onClick={() => UpdateStatus2(item)}>
          Đã Bán
        </Button>
        <IconButton
          size="small"
          color="primary"
          onClick={() => history.push(`/admin/edit/${item.id_nha}`)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="delete"
          className={classes.delete}
          onClick={() => handleDelete(item.id_nha)}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
