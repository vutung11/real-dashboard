import React, { useState, useEffect, useRef } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { Select, MenuItem, NativeSelect } from "@material-ui/core";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { AirplaySharp, Delete, DeleteOutline } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Grid from "@material-ui/core/Grid";

// core components
import GridItem from "components/Grid/GridItem.js";
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

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import { MAP_BOX_API } from "assets/jss/_constant";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import "./styles.css";
import { FormControl } from "@material-ui/core";
import { setConstantValue } from "typescript";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { API_KEY, API_KEY_IMG } from "../../shared/_constant";
import _ from "lodash";
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = MAP_BOX_API;
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    display: "flex",
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
  buttonDelete: {
    zIndex: "9999",
    fontWeight: "bold",
    position: "absolute",
    marginLeft: "190px",
    color: "red",
  },
  cardSize: {
    width: "100%",
    height: 400,
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
  const [dataFetch, setDataFetch] = useState([]);
  const { id } = useParams();
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
    loainha: "",
    sophong: "",
    sotoilet: "",
    dientich: "",
    gia: "",
    chitiet: "",
    banner: "",
    hinh: [],
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
    console.log(fileBanner.name);
    console.log(valInput.hinh.toString());
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
      hinh: valInput.hinh.toString(),
    };
    console.log(fileBanner);
    console.log(postData);
    console.log(id);
    await axios
      .put(`http://127.0.0.1:8000/api/nha/${id}`, postData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // setLng(res.data.nha.lon);
        // setLat(res.data.nha.lat);
      });
    alert("Sửa nhà thành công");
    setTimeout(() => {
      window.location = "http://localhost:3001/admin/real";
    }, 1500);
  };

  const uploadBanner = async (e) => {
    const file = e.target.files[0];
    var bodyFormData = new FormData();
    bodyFormData.append("link", file);
    console.log(file);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/hinh",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setFilerBanner(res.data.link);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadList = async (e) => {
    const fileList = e.target.files;
    // console.log(fileList);
    const listLink = [];
    for (let i = 0; i < fileList.length; i++) {
      const uploadItem = async () => {
        console.log(fileList[i]);
        var bodyFormData = new FormData();
        bodyFormData.append("link", fileList[i]);
        try {
          const res = await axios.post(
            "http://127.0.0.1:8000/api/hinh",
            bodyFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          await listLink.push(res.data.link);
        } catch (error) {
          console.log(error);
        }
      };
      await uploadItem();
    }
    console.log(...listLink);
    if (listLink.length > 0) {
      console.log(listLink);
      setValInput((preState) => {
        return { ...preState, hinh: [...preState.hinh, ...listLink] };
      });
    }
  };

  const deleteImg = async (linkImg) => {
    let x = valInput.hinh;
    console.log(linkImg);
    _.remove(x, (e) => e == linkImg);
    console.log(x);
    setValInput({ ...valInput, hinh: x });
  };
  const fetchData = async () => {
    const res1 = await axios.get("http://127.0.0.1:8000/api/dia_chi");
    setListThanhPho(res1.data.thanh_pho);
    const res2 = await axios.get(`${API_KEY}/nha/${id}`);
    // let valThanhPho = "";
    if (res2.data.nha) {
      let valThanhPho = _.find(res1.data.thanh_pho, (e) => {
        return e._name == res2.data.nha.thanh_pho;
      }).id;
      const res3 = await axios.get(
        `http://127.0.0.1:8000/api/dia_chi/${valThanhPho}`
      );
      const valQuanHuyen = _.find(res3.data.quan, (e) => {
        return e._name == res2.data.nha.quan;
      }).id;
      const res4 = await axios.get(
        `http://127.0.0.1:8000/api/dia_chi/${valThanhPho}/${valQuanHuyen}`
      );
      const valDuong = _.find(res4.data.duong, (e) => {
        return e._name == res2.data.nha.duong;
      }).id;
      const valPhuong = _.find(res4.data.phuong, (e) => {
        return e._name == res2.data.nha.phuong;
      }).id;
      setFilerBanner(res2.data.nha.banner);

      setValInput((preState) => {
        return {
          ...preState,
          thanhpho: valThanhPho,
          quanhuyen: valQuanHuyen,
          duong: valDuong,
          phuongxa: valPhuong,
          sonha: res2.data.nha.so_nha,
          loainha: res2.data.nha.loai_nha,
          hinhthuc: res2.data.nha.hinh_thuc,
          sophong: res2.data.nha.so_phong,
          sotoilet: res2.data.nha.so_toilet,
          dientich: res2.data.nha.dien_tich,
          gia: res2.data.nha.gia,
          chitiet: res2.data.nha.mo_ta,
          hinh: res2.data.nha.hinh ? res2.data.nha.hinh.split(",") : [],
        };
      });

      return res2;
    }
  };
  useEffect(async () => {
    const {
      data: { nha },
    } = await fetchData();
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [nha.lon, nha.lat],
      zoom: zoom,
    });
    let marker = new mapboxgl.Marker().setLngLat([nha.lon, nha.lat]).addTo(map);
    map.on("click", function (e) {
      marker.remove();
      setLng(e.lngLat.lng);
      setLat(e.lngLat.lat);
      marker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);
    });
    return () => map.remove();
  }, []);
  useEffect(() => {
    console.log(listImages);
  }, [listImages]);

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
            <Tabs
              position="static"
              value={index}
              onChange={onTabClick}
              // variant="small"
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
                      return (
                        <option key={e.id} value={e.id}>
                          {e._name}
                        </option>
                      );
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
                        return (
                          <option key={e.id} value={e.id}>
                            {e._name}
                          </option>
                        );
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
                        return (
                          <option key={e.id} value={e.id}>
                            {e._name}
                          </option>
                        );
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
                    <option value={1}>Nhà phố</option>
                    <option value={2}>Chung cư</option>
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
            rows={24}
            cols={108}
            aria-label="maximum height"
            placeholder="Mô tả chi tiết"
            name="chitiet"
            onChange={onChangeInput}
            value={valInput.chitiet}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={4} style={{ marginTop: -30 }}>
          <Card>
            <CardBody>
              <GridItem xs={12} sm={12}>
                <Button variant="contained" component="label">
                  Ảnh Banner
                  <input
                    type="file"
                    hidden
                    name="banner"
                    onChange={uploadBanner}
                  />
                </Button>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {fileBanner ? (
                      <img
                        className="banner"
                        src={`${API_KEY_IMG}${fileBanner}`}
                        // src={`${API_KEY_IMG}${valInput.banner}`}
                        alt=""
                      ></img>
                    ) : (
                      ""
                    )}
                  </GridItem>
                </GridContainer>
              </GridItem>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={8}>
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
                      uploadList(e);
                    }}
                  />
                </Button>
                <GridContainer>
                  {valInput.hinh.map((e, index) => {
                    return (
                      <GridItem key={index} xs={4}>
                        {/* <p onClick={() => deleteImg(e)}>X</p> */}
                        <IconButton
                          className={classes.buttonDelete}
                          size="small"
                          // color="primary"
                        >
                          <DeleteTwoToneIcon onClick={() => deleteImg(e)} />
                        </IconButton>
                        <Image
                          className="imgUrl"
                          // src={URL.createObjectURL(e)}
                          src={`${API_KEY_IMG}${e}`}
                        />
                      </GridItem>
                    );
                  })}
                </GridContainer>
              </GridItem>
            </CardBody>
          </Card>
          <GridContainer container justify="flex-end">
            <GridItem>
              <Button color="primary" type="submit" onClick={onFinish}>
                Sửa Nhà
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
