import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
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
import { MAP_BOX_API } from "assets/jss/_constant";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { API_KEY } from "../../shared/_constant";
import { API_KEY_IMG } from "../../shared/_constant";
import { Button, Typography } from "@material-ui/core";

mapboxgl.workerClass = MapboxWorker;
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
  cardTitle: {
    textAlign: "justify",
  },
  cardMota: {
    textAlign: "justify",
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
    // console.log(lat, lng);
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
            <Grid item xs={12}>
              {listHinh.map((item) => {
                return (
                  <img className="banner" src={`${API_KEY_IMG}${item}`}></img>
                );
              })}
            </Grid>
            <Grid></Grid>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card profile>
          {/* <CardAvatar profile>
            <img
              className="banner"
              src={realData.nha ? API_KEY_IMG + realData.nha.banner : ""}
            ></img>
          </CardAvatar> */}
          <CardBody profile>
            <h4 className={classes.cardTitle}>
              Địa chỉ:
              {realData.nha
                ? realData.nha.duong +
                  ", Phường" +
                  realData.nha.phuong +
                  ", " +
                  realData.nha.quan +
                  ", Thành phố " +
                  realData.nha.thanh_pho
                : ""}
            </h4>
            <h4 className={classes.cardTitle}>
              Giá bán:
              {realData.nha ? +realData.nha.gia + " Tỷ" : ""}
            </h4>
            <h4 className={classes.cardTitle}>
              Diện tích:
              {realData.nha ? +realData.nha.dien_tich + " m2" : ""}
            </h4>
            <h4 className={classes.cardTitle}>
              Phòng ngủ:
              {realData.nha ? +realData.nha.so_phong + " phòng" : ""}
            </h4>
            <h4 className={classes.cardTitle}>
              Toilet:
              {realData.nha ? +realData.nha.so_toilet + " phòng" : ""}
            </h4>
            <h5 className={classes.cardMota}>
              {realData.nha ? realData.nha.mo_ta : ""}
            </h5>
          </CardBody>
        </Card>
      </GridItem>
      {/* <Grid>
        <h3 className={classes.cardTitle}>
          {realData.nha ? +realData.nha.mo_ta + " Tỷ" : ""}
        </h3>
      </Grid> */}
      <Grid>
        <Button
          variant="contained"
          color="second"
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
      </Grid>
    </GridContainer>
  );
};

RealDetail.propTypes = {};

export default RealDetail;
