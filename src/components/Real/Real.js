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
import VisibilityIcon from "@material-ui/icons/Visibility";
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
  },
  media: {
    height: 140,
  },
  imgUrl: {
    maxWidth: "100%",
    maxHeight: "220px",
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
    // <Container className={classes.root}>
    //   <Gird container>
    //     <Gird item sm={3}>
    //       <Card></Card>
    //     </Gird>
    //   </Gird>
    //   <CardActionArea onClick={() => handleRealClick(item)}>
    //     <img
    //       // style={{ width: "100%" }}
    //       className={classes.imgUrl}
    //       src={API_KEY_IMG + item.banner}
    //     />
    //     <CardContent>
    //       {/* <Typography gutterBottom variant="h5" component="h2"></Typography> */}
    //       <Typography variant="subtitle1">
    //         {/* {item.mo_ta} */}
    //         Cần bán gấp căn nhà 2 mặt tiền Quận 2
    //         {/* {item.thanh_pho + "/" + item.phuong + "/" + item.quan} */}
    //       </Typography>
    //       <Typography variant="h6" color="textSecondary" component="span">
    //         {item.dien_tich + "m2 " + " /" + item.loai_nha + item.hinh_thuc}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Typography variant="h6" color="textSecondary" component="span">
    //       {item.gia + " đ"}
    //     </Typography>
    //   </CardActions>
    //   <IconButton aria-label="add to favorites">
    //     <FindInPageOutlined />
    //   </IconButton>
    //   <IconButton aria-label="share">
    //     <Delete />
    //   </IconButton>
    // </Container>
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleRealClick(item)}>
        <img
          style={{ width: "100%" }}
          className={classes.imgUrl}
          src={API_KEY_IMG + item.banner}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="h2">
            {"Số :  " +
              item.so_nha +
              " Đường " +
              item.duong +
              ", Phường " +
              item.phuong +
              ", " +
              item.quan +
              ", Thành Phố " +
              item.thanh_pho}
          </Typography>
          <Typography variant="h6" component="h2">
            {item.gia + " tỷ"}
          </Typography>
          <Typography variant="h5" component="h2">
            {item.dien_tich + "m2 / " + item.hinh_thuc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          size="small"
          color="primary"
          onClick={() => history.push(`/admin/edit/${item.id_nha}`)}
        >
          <FindInPageOutlined />
        </IconButton>
        <IconButton
          size="small"
          aria-label="delete"
          onClick={() => handleDelete(item.id_nha)}
        >
          <Delete />
        </IconButton>
        <IconButton>
          <VisibilityIcon onClick={() => UpdateStatus(item)} />
          Ẩn Tin
        </IconButton>
        <IconButton>
          <StreetviewIcon onClick={() => UpdateStatus2(item)} />
          Đã bán
        </IconButton>
      </CardActions>
    </Card>
  );
}
