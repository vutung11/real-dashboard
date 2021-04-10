import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom'
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "./RealDetail.css";
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import bgImage from "assets/img/sidebar-2.jpg";
import GridListImage from "components/GridListImage/GridListImage"
import axios from "axios"
// import "mapbox-gl/dist/mapbox-gl.css";
import { MAP_BOX_API } from "assets/jss/_constant";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker"; // Load worker code separately with worker-loader
import { API_KEY } from "../../shared/_constant";
import { API_KEY_IMG } from "../../shared/_constant";

mapboxgl.workerClass = MapboxWorker; // Wire up loaded worker to be used instead of the default
mapboxgl.accessToken = MAP_BOX_API;

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  cardSize: {
    width: "100%",
    height: 400,
  },

  sticky: {
    position: 'sticky'
  }
};

const TILE_DATA = [1,2,3,4,5,6].map((_, index) => ({
  img: 'https://picsum.photos/id/' + index + '/' +  Math.ceil(Math.random() * 200) + '.jpg',
  title: 'Image',
  author: 'author',
  cols: 2
}))
const useStyles = makeStyles(styles);

const RealDetail = (props) => {
  const classes = useStyles();
  const { detail } = useParams();
  const mapContainer = useRef();
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(15);
  const [tileData, setTileData] = useState(TILE_DATA);
  const [realData, setRealData] = useState({});

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    return () => map.remove();
  });

  useEffect(() => {
      const fetchApi = async () => {
        try {
          const data = await axios.get(`${API_KEY}/nha/${detail}`)
          setRealData(data.data)
          setLng(data.data.nha.lat);
          setLat(data.data.nha.lon);
          console.log(data.data.hinh);
        } catch(e) {
          console.log(e)
        }
      }

      fetchApi()
    }, [])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
        <Card className={classes.cardSize}>
          <div ref={mapContainer} className="map-container"></div>
        </Card>
            <Grid container spacing={3} item/>
              <Card className={classes.cardMargin}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Banner</h4>
                </CardHeader>
                <CardBody>
                  <Grid item xs={12}>
                    <img className="banner" src={realData.nha ? API_KEY_IMG+realData.nha.banner : ''}></img>
                  </Grid>
                </CardBody>
              </Card>
              {/* <Grid item xs={6}>
                <img src={realData.hinh ? 
                `${realData.hinh.map((value) => (
                  <div key={value.id}>
                    {value.link}
                  </div>
                ))}` : ''}></img>
              </Grid> */}
              {/* {realData.map((value) => (
                <Grid item xs={6} key={value.hinh}>
                  <img src={value.link}></img>
                </Grid>
              ))} */}
              <GridContainer>
                {realData.hinh && realData.hinh.map((value) => (
                  <Grid key={value.id} item xs={4}>
                    <img className="imgUrl" src={API_KEY_IMG+value.link}></img>
                  </Grid>
                ))}
              </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card profile>
          <CardAvatar profile>
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img src={bgImage} alt="..." />
            </a>
          </CardAvatar>
          <CardBody profile>
            <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
            <h4 className={classes.cardTitle}>Alec Thompson</h4>
            <p className={classes.description}>
              Don{"'"}t be scared of the truth because we need to restart the
              human foundation in truth And I love you like Kanye loves Kanye I
              love Rick Owens’ bed design but the back is...
            </p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

RealDetail.propTypes = {};

export default RealDetail;
