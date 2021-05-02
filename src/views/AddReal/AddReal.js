import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactDOM from "react-dom";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { Select, MenuItem, NativeSelect } from "@material-ui/core";
import { Tabs, Tab, AppBar } from "@material-ui/core";

// core components
import GridItem from "components/Grid/GridItem.js";
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import Image from "material-ui-image";
import banner from "assets/img/cover.jpeg";
import { MAP_BOX_API } from "assets/jss/_constant";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import "./styles.css";
import { FormControl } from "@material-ui/core";
import { setConstantValue } from "typescript";
import axios from "axios";
import { useHistory } from "react-router";
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
  cardMargin: {
    marginTop: 0,
  },
  name: {
    color: "red",
  },
  cardSize: {
    width: "100%",
    height: 400,
    // top: 0,
    // bottom: 0,
  },
  sticky: {
    position: "sticky",
  },
};

const useStyles = makeStyles(styles);
const Panel = (props) => (
  <div hidden={props.value !== props.index}>
    {props.value === props.index && <Typography>{props.children}</Typography>}
  </div>
);
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(1),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "10px 26px 13px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
export default function UserProfile() {
  const history = useHistory();
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const [country, setCountry] = React.useState("");
  const [val, setVal] = React.useState({});
  const [fileBanner, setFilerBanner] = useState("");
  const [listImages, setListImages] = useState([]);
  const mapContainer = useRef();
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(15);

  const [valInput, setValInput] = useState({
    thanhpho: "",
    quanhuyen: "",
    phuongxa: "",
    duong: "",
    sonha: "",
    hinhthuc: "",
    loainha: "",
    sophong: "",
    sotoilet: "",
    dientich: "",
    gia: "",
    chitiet: "",
  });
  const [listThanhPho, setListThanhPho] = useState([]);
  const [listQuanHuyen, setListQuanHuyen] = useState([]);
  const [listPhuongXa, setListPhuongXa] = useState([]);
  const [listDuong, setListDuong] = useState([]);
  const fetchDataListThanhPho = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/dia_chi");
    setListThanhPho(res.data.thanh_pho);
  };
  const fetchDataListQuanHuyen = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/dia_chi/${valInput.thanhpho}`
    );
    setListQuanHuyen(res.data.quan);
  };
  const fetchDataListPhuongXa = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/dia_chi/${valInput.thanhpho}/${valInput.quanhuyen}`
    );
    setListPhuongXa(res.data.phuong);
  };
  const fetchDataListDuong = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/dia_chi/${valInput.thanhpho}/${valInput.quanhuyen}`
    );
    setListDuong(res.data.duong);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });
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
    fetchDataListThanhPho();
  }, []);
  useEffect(() => {
    fetchDataListQuanHuyen();
  }, [valInput.thanhpho]);
  useEffect(() => {
    fetchDataListPhuongXa();
    fetchDataListDuong();
  }, [valInput.quanhuyen]);

  const onTabClick = (e, index) => {
    setIndex(index);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setCountry(e.target.value);
  };
  const handleTabs = (e) => {
    console.log(e.target.value);
    setVal(e.target.value);
  };

  const onChangeInput = (e) => {
    console.log("dmm");
    let name = e.target.name;
    let value = e.target.value;
    setValInput((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  };
  const onFinish = async (e) => {
    e.preventDefault();
    console.log(valInput);
    const postData = {
      id_khach_hang: 15,
      hinh_thuc: valInput.hinhthuc,
      loai_nha: valInput.loainha,
      lat: lat,
      lon: lng,
      gia: valInput.gia,
      dien_tich: valInput.dientich,
      so_phong: valInput.sophong,
      so_toilet: valInput.sotoilet,
      banner: fileBanner,
      mo_ta: valInput.chitiet,
      thanh_pho: valInput.thanhpho,
      quan: valInput.quanhuyen,
      phuong: valInput.phuongxa,
      duong: valInput.duong,
      so_nha: valInput.sonha,
      trang_thai: 1,
      duyet: 0,
      // images: listImages,
    };
    var form_data = new FormData();

    for (var key in postData) {
      form_data.append(key, postData[key]);
      console.log(form_data);
    }
    for (const file of listImages) {
      form_data.append("images[]", file);
    }
    console.log(form_data.getAll("images[]"), "form_data");
    // console.log(postData);
    try {
      await axios.post("http://127.0.0.1:8000/api/nha", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // history.push("/admin/real");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadBanner = async (e) => {
    const file = e.target.files[0];
    setFilerBanner(file);
    console.log(URL.createObjectURL(file));
  };
  const uploadList = async (e) => {
    console.log(e.target.files);
    const file = e.target.files;
    // console.log(URL.createObjectURL(file));
    console.log(file[0], file);
    setListImages([...listImages, ...file]);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.cardSize}>
            <div ref={mapContainer} className="map-container"></div>
          </Card>
          <Grid container spacing={3} item />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={4}>
          <Card xs={12} sm={4}>
            {/* <TextField id="outlined-basic" label="Nhập tiêu đề nhà" variant="outlined" />
          <TextareaAutosize aria-label="empty textarea" placeholder="Empty" /> */}
            <Tabs
              position="static"
              value={index}
              onChange={onTabClick}
              variant="small"
            >
              <Tab label="Vị trí" />
              <Tab label="Thông tin" />
            </Tabs>

            <Panel value={index} index={0} className={classes.name}>
              <GridItem xs={12} sm={12}>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel>Tỉnh/Thành Phố</InputLabel>
                  <NativeSelect
                    style={{ minWidth: "100%" }}
                    displayEmpty
                    onChange={(e) => onChangeInput(e)}
                    value={valInput.thanhpho}
                    input={<BootstrapInput />}
                    name="thanhpho"
                  >
                    <option value="" disabled>
                      Chọn
                    </option>
                    {listThanhPho.map((e, index) => {
                      return <option value={e.id}>{e._name}</option>;
                    })}
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel>Quận/Huyện</InputLabel>
                  <NativeSelect
                    style={{ minWidth: "100%" }}
                    displayEmpty
                    onChange={onChangeInput}
                    value={valInput.quanhuyen}
                    input={<BootstrapInput />}
                    name="quanhuyen"
                  >
                    <option value="" disabled>
                      Chọn
                    </option>
                    {listQuanHuyen &&
                      listQuanHuyen.map((e, index) => {
                        return <option value={e.id}>{e._name}</option>;
                      })}
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel>Phường/Xã</InputLabel>
                  <NativeSelect
                    style={{ minWidth: "100%" }}
                    displayEmpty
                    onChange={onChangeInput}
                    value={valInput.phuongxa}
                    input={<BootstrapInput />}
                    name="phuongxa"
                  >
                    <option value="" disabled>
                      Chọn
                    </option>
                    {listPhuongXa &&
                      listPhuongXa.map((e, index) => {
                        return <option value={e.id}>{e._name}</option>;
                      })}
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel>Đường</InputLabel>
                  <NativeSelect
                    style={{ minWidth: "100%" }}
                    displayEmpty
                    onChange={onChangeInput}
                    value={valInput.duong}
                    input={<BootstrapInput />}
                    name="duong"
                  >
                    <option value="" disabled>
                      Chọn
                    </option>
                    {listDuong &&
                      listDuong.map((e, index) => {
                        return <option value={e.id}>{e._name}</option>;
                      })}
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12, marginBottom: 80 }}>
                  <InputLabel style={{ marginBottom: 5 }}>Số nhà</InputLabel>
                  <TextField
                    style={{ minWidth: "100%" }}
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    name="sonha"
                    onChange={onChangeInput}
                    value={valInput.sonha}
                  />
                </GridItem>
              </GridItem>
            </Panel>
            <Panel value={index} index={1}>
              <GridItem xs={12} sm={12}>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel>Hình thức</InputLabel>
                  <NativeSelect
                    style={{ minWidth: "100%" }}
                    displayEmpty
                    onChange={onChangeInput}
                    value={valInput.hinhthuc}
                    input={<BootstrapInput />}
                    name="hinhthuc"
                  >
                    <option value="" disabled>
                      Chọn
                    </option>
                    <option value={1}>Mua Bán</option>
                    <option value={2}>Cho Thuê</option>
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel>Loại nhà đất</InputLabel>
                  <NativeSelect
                    style={{ minWidth: "100%" }}
                    displayEmpty
                    onChange={onChangeInput}
                    value={valInput.loainha}
                    input={<BootstrapInput />}
                    name="loainha"
                  >
                    <option value="" disabled>
                      Chọn
                    </option>
                    <option value={1}>Nhà Phố</option>
                    <option value={2}>Chung Cư</option>
                    <option value={3}>Đất</option>
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel style={{ marginBottom: 5 }}>Số phòng</InputLabel>
                  <TextField
                    style={{ minWidth: "100%" }}
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    name="sophong"
                    onChange={onChangeInput}
                    value={valInput.sophong}
                  />
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel style={{ marginBottom: 5 }}>Số tolet</InputLabel>
                  <TextField
                    style={{ minWidth: "100%" }}
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    name="sotoilet"
                    onChange={onChangeInput}
                    value={valInput.sotoilet}
                  />
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel style={{ marginBottom: 3 }}>Diện tích</InputLabel>
                  <TextField
                    style={{ minWidth: "100%" }}
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    name="dientich"
                    onChange={onChangeInput}
                    value={valInput.dientich}
                  />
                </GridItem>
                <GridItem style={{ marginTop: 12, marginBottom: 20 }}>
                  <InputLabel style={{ marginBottom: 3 }}>Giá bán</InputLabel>
                  <TextField
                    style={{ minWidth: "100%" }}
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    name="gia"
                    onChange={onChangeInput}
                    value={valInput.gia}
                  />
                </GridItem>
              </GridItem>
            </Panel>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <TextareaAutosize
            style={{ minWidth: "100%", marginBottom: 11, marginTop: 30 }}
            rows={34}
            cols={108}
            aria-label="maximum height"
            placeholder="Mô tả chi tiết"
            name="chitiet"
            onChange={onChangeInput}
            value={valInput.chitiet}
          />
          {/* <CKEditor
            style={{ minWidth: "100%", marginBottom: 11, marginTop: 30 }}
            rows={24}
            cols={108}
            aria-label="maximum height"
            placeholder="Mô tả chi tiết"
            name="chitiet"
            onChange={onChangeInput}
            value={valInput.chitiet}
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            // onReady={(editor) => {
            //   // You can store the "editor" and use when it is needed.
            //   console.log("Editor is ready to use!", editor);
            // }}
            // onChange={(event, editor) => {
            //   const data = editor.getData();
            //   console.log({ event, editor, data });
            // }}
            // onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
            // }}
          /> */}
        </GridItem>
      </GridContainer>

      {/* <GridContainer>
        <GridItem xs={12} sm={9}>
          <div ref={mapContainer} className="map-container"></div>
        </GridItem>
      </GridContainer> */}
      {/* <GridContainer>
        <GridItem>
          <Card className={classes.cardSize}>
            <div ref={mapContainer} className="map-container"></div>
          </Card>
        </GridItem>
      </GridContainer> */}
      <GridContainer>
        <GridItem xs={12} sm={4} style={{ marginTop: -30 }}>
          <Card>
            <CardBody>
              <GridItem xs={12} sm={6}>
                <Button variant="contained" component="label">
                  Ảnh Banner
                  <input type="file" hidden onChange={uploadBanner} />
                </Button>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <img
                      className="banner"
                      src={fileBanner ? URL.createObjectURL(fileBanner) : ""}
                      alt=""
                    ></img>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={8} style={{}}>
          <Card className={classes.cardMargin}>
            <CardBody>
              <GridItem xs={12} sm={12}>
                <Button variant="contained" component="label">
                  Ảnh Chi Tiết
                  <input
                    type="file"
                    name="images[]"
                    hidden
                    multiple
                    onChange={(e) => {
                      console.log(typeof listImages);
                      uploadList(e);
                    }}
                  />
                </Button>
                <GridContainer>
                  {listImages.map((e) => {
                    return (
                      <GridItem xs={4}>
                        <Image
                          className="imgUrl"
                          src={URL.createObjectURL(e)}
                        />
                      </GridItem>
                    );
                  })}
                  {/* <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem> */}
                </GridContainer>
              </GridItem>
            </CardBody>
          </Card>
          <GridContainer container justify="flex-end">
            {/* <GridItem>
              <Button color="secondary" type="submit" onClick={onFinish}>
                Quay Lại
              </Button>
            </GridItem>
            <GridItem>
              <Button color="primary" type="submit" onClick={onFinish}>
                Duyệt Nhà
              </Button>
            </GridItem> */}
            <GridItem>
              <Button color="primary" type="submit" onClick={onFinish}>
                Thêm Nhà
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
