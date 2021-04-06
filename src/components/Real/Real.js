import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import bgImage from "assets/img/sidebar-2.jpg";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ item }) {
  let history = useHistory();

  const classes = useStyles();

  const handleRealClick = (item) => {
    history.push("/admin/home/" + item.id_nha);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleRealClick(item)}>
        <CardMedia
          className={classes.media}
          image={bgImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">

          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { item.thanh_pho + '/' + item.phuong + '/' +item.quan }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="h6" color="textSecondary" component="span">
          { item.gia + ' VND' }
        </Typography>
      </CardActions>
    </Card>

  );
}
