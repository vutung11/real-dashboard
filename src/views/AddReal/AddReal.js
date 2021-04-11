import React, { useState } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { Select, MenuItem, NativeSelect } from "@material-ui/core";
import { Tabs, Tab, AppBar } from "@material-ui/core";

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
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';


import TextareaAutosize from '@material-ui/core/TextareaAutosize';


import "./styles.css";
import { FormControl } from "@material-ui/core";
import { setConstantValue } from "typescript";

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
  }
};

const useStyles = makeStyles(styles);
const Panel = (props) => (
  <div hidden={props.value !== props.index}>
    {props.value === props.index && <Typography>{props.children}</Typography>}
  </div>
);
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(1),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 14,
    padding: '10px 26px 13px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
export default function UserProfile() {


  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const [country, setCountry] = React.useState('');
  const [val, setVal] = React.useState('');
  const onTabClick = (e, index) => {
    setIndex(index);
  };
  const handleChange = (e) => {
    console.log(e.target.value)
    setCountry(e.target.value);
  };
  const handleTabs = (e) => {
    console.log(e.target.value);
    setVal(e.target.value);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={4} >
          <Card xs={12} sm={4}>

            {/* <TextField id="outlined-basic" label="Nhập tiêu đề nhà" variant="outlined" />
          <TextareaAutosize aria-label="empty textarea" placeholder="Empty" /> */}
            <Tabs position="static" value={index} onChange={onTabClick} variant="small" >
              <Tab label="Vị trí" />
              <Tab label="Thông tin" />
            </Tabs>

            <Panel value={index} index={0} className={classes.name} >
              <GridItem xs={12} sm={12}>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel >Tỉnh/Thành Phố</InputLabel>
                  <NativeSelect style={{ minWidth: '100%' }} value={country} displayEmpty onChange={handleChange}
                    input={<BootstrapInput />}

                  >
                    <option value="" disabled>
                      Chọn
                  </option>
                    <option value={1}>Hồ Chí Minh</option>
                    <option value={2}>Đà Nẵng</option>
                    <option value={3}>Hải Phòng</option>
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel >Quận/Huyện</InputLabel>
                  <NativeSelect style={{ minWidth: '100%' }} value={country} displayEmpty onChange={handleChange}
                    input={<BootstrapInput />}

                  >
                    <option value="" disabled>
                      Chọn
                  </option>
                    <option value={1}>Hồ Chí Minh</option>
                    <option value={2}>Đà Nẵng</option>
                    <option value={3}>Hải Phòng</option>
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel >Phường/Xã</InputLabel>
                  <NativeSelect style={{ minWidth: '100%' }} value={country} displayEmpty onChange={handleChange} input={<BootstrapInput />}

                  >
                    <option value="" disabled>
                      Chọn
                  </option>
                    <option value={1}>Hồ Chí Minh</option>
                    <option value={2}>Đà Nẵng</option>
                    <option value={3}>Hải Phòng</option>
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12, marginBottom: 80 }}>
                  <InputLabel style={{ marginBottom: 5 }} >Địa chỉ</InputLabel>
                  <TextField style={{ minWidth: '100%' }}
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                  />
                </GridItem>
              </GridItem>

            </Panel>
            <Panel value={index} index={1}>
              <GridItem xs={12} sm={12}>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel >Loại nhà đất</InputLabel>
                  <NativeSelect style={{ minWidth: '100%' }} value={country} displayEmpty onChange={handleChange} input={<BootstrapInput />}
                  >
                    <option value="" disabled>
                      Chọn
                  </option>
                    <option value={1}>Hồ Chí Minh</option>
                    <option value={2}>Đà Nẵng</option>
                    <option value={3}>Hải Phòng</option>
                  </NativeSelect>
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel style={{ marginBottom: 5 }} >Số phòng</InputLabel>
                  <TextField style={{ minWidth: '100%' }}
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                  />
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel style={{ marginBottom: 5 }} >Số tolet</InputLabel>
                  <TextField style={{ minWidth: '100%' }}
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                  />
                </GridItem>
                <GridItem style={{ marginTop: 12 }}>
                  <InputLabel style={{ marginBottom: 3 }} >Diện tích</InputLabel>
                  <TextField style={{ minWidth: '100%' }}
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                  />
                </GridItem>
                <GridItem style={{ marginTop: 12, marginBottom: 20 }}>
                  <InputLabel style={{ marginBottom: 3 }} >Giá bán</InputLabel>
                  <TextField style={{ minWidth: '100%' }}
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                  />
                </GridItem>
              </GridItem>
            </Panel>
          </Card>

        </GridItem>
        <GridItem xs={12} sm={8}>
          <TextField style={{ minWidth: '100%', marginBottom: 11, marginTop: 30 }} id="outlined-basic" label="Tiêu đề bài viết" variant="outlined" />
          <TextareaAutosize
            rows={24}
            cols={108}
            aria-label="maximum height"
            placeholder="Mô tả chi tiết"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>

        <GridItem xs={12} sm={4} style={{ marginTop: -30 }}>
          <Card>
            <CardBody>
              <GridItem xs={12} sm={6}>
                <Button variant="contained" component="label">
                  Ảnh Banner
                  <input type="file" hidden />
                </Button>
                {/* <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <img className="banner" src={banner} alt=""></img>
                  </GridItem>
                </GridContainer> */}
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
                  <input type="file" hidden />
                </Button>
                <GridContainer>
                  <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4} >
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4} >
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                  <GridItem xs={4}>
                    <Image className="imgUrl" src={banner} />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </CardBody>
          </Card>
          <GridContainer container justify="flex-end">
            <GridItem>
              <Button color="primary">Thêm Nhà</Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div >
  );
}
