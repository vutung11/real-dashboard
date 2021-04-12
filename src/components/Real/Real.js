import React from "react";
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
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  imgUrl: {
    width: "100%",
    height: "100%",
  },
});

export default function MediaCard({ item }) {
  let history = useHistory();

  const classes = useStyles();

  const handleRealClick = (item) => {
    history.push("/admin/home/" + item.id_nha);
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
          // style={{ width: "100%" }}
          className={classes.imgUrl}
          src={API_KEY_IMG + item.banner}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="p">
            Cần bán nhà 2 mặt tiền quận 2nhà 2 mặt tiền quậ
          </Typography>
          <Typography variant="h4" component="h2">
            {item.gia}
          </Typography>
          <Typography variant="h5" component="h2">
            {item.dien_tich + "/" + item.loai_nha + "/" + item.hinh_thuc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton size="small" color="primary">
          <FindInPageOutlined />
        </IconButton>
        <IconButton size="small" aria-label="delete">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
