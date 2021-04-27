import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "./RealDetail.css";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import bgImage from "assets/img/sidebar-2.jpg";
import GridListImage from "components/GridListImage/GridListImage";
import ReactMapGL from "react-map-gl";
import axios from "axios";
// import "mapbox-gl/dist/mapbox-gl.css";
import { MAP_BOX_API } from "assets/jss/_constant";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker"; // Load worker code separately with worker-loader
import { API_KEY } from "../../shared/_constant";
import { API_KEY_IMG } from "../../shared/_constant";
import { Button, Typography } from "@material-ui/core";

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
    position: "sticky",
  },
};

const TILE_DATA = [1, 2, 3, 4, 5, 6].map((_, index) => ({
  img:
    "https://picsum.photos/id/" +
    index +
    "/" +
    Math.ceil(Math.random() * 200) +
    ".jpg",
  title: "Image",
  author: "author",
  cols: 2,
}));
const useStyles = makeStyles(styles);

const RealDetail = (props) => {
  const classes = useStyles();
  const { detail } = useParams();
  console.log(detail);
  const mapContainer = useRef();
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(15);
  const [tileData, setTileData] = useState(TILE_DATA);
  const [realData, setRealData] = useState({});
  const [listHinh, setListHinh] = useState([]);

  const UpdateStatus = async (id) => {
    let duyet = 1;

    await axios
      .put(`http://127.0.0.1:8000/api/nha/${id}`, {
        duyet: duyet,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    console.log(duyet);
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   setLng(position.coords.longitude);
    //   setLat(position.coords.latitude);
    // });
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    let marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    map.on("click", function (e) {
      marker.remove();
      setLng(e.lngLat.lng);
      setLat(e.lngLat.lat);
      marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    });

    return () => map.remove();
  });

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await axios.get(`${API_KEY}/nha/${detail}`);
        const listHinh1 = data.data.nha.hinh.split(",");
        setRealData(data.data);
        setListHinh(listHinh1);
        setLng(data.data.nha.lon);
        setLat(data.data.nha.lat);
      } catch (e) {
        console.log(e);
      }
    };

    fetchApi();
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
        <Card className={classes.cardSize}>
          <div ref={mapContainer} className="map-container"></div>
        </Card>
        <Grid container spacing={3} item />
        <Card className={classes.cardMargin}>
          <CardBody>
            <Grid item xs={12}>
              <img
                className="banner"
                src={realData.nha ? API_KEY_IMG + realData.nha.banner : ""}
              ></img>
            </Grid>
            <Grid item xs={4}>
              {listHinh.map((item) => {
                return (
                  <img className="banner" src={`${API_KEY_IMG}${item}`}></img>
                );
              })}
            </Grid>
            <Grid></Grid>
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
        {/* <GridContainer>
          <img className="banner" src={listHinh[0]}></img>
        </GridContainer> */}
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card profile>
          <CardAvatar profile>
            <img
              className="banner"
              src={realData.nha ? API_KEY_IMG + realData.nha.banner : ""}
            ></img>
          </CardAvatar>
          <CardBody profile>
            <h3 className={classes.cardTitle}>
              {realData.nha ? +realData.nha.gia + " Tỷ" : ""}
            </h3>
            <h3 className={classes.cardTitle}>
              {realData.nha
                ? +realData.nha.dien_tich +
                  " m2" +
                  " || " +
                  realData.nha.so_phong +
                  " phòng ngủ" +
                  " || " +
                  realData.nha.so_toilet +
                  " toilet"
                : ""}
            </h3>
            <p className={classes.cardTitle}>
              {realData.nha ? +realData.nha.mo_ta : ""}
            </p>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: 20, padding: 10 }}
        >
          Quay Lại
        </Button>
        <Button
          onClick={() => UpdateStatus(detail)}
          variant="contained"
          color="primary"
          style={{ padding: 10 }}
        >
          Duyệt Nhà
        </Button>
      </GridItem>
    </GridContainer>
  );
};

RealDetail.propTypes = {};

export default RealDetail;
