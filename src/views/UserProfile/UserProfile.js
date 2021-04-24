import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import blankavt from "./blankavt.jpg";
// core components
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import avatar from "assets/img/faces/marc.jpg";
import { API_KEY } from "../../shared/_constant";
import { API_KEY_IMG } from "../../shared/_constant";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { FormControl, Input } from "@material-ui/core";

import './styles.css';

const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
}));

export default function UserProfile() {
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [name, setName] = React.useState();
  const [address, setAddress] = React.useState();
  const [imgUrl, setImgUrl] = React.useState("");
  const [user, setUser] = useState({})
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        window.location = 'http://localhost:3001/login';
      }
      const data = await axios.get(`${API_KEY}/khach_hang/${id}`)
      setUser(data.data.khach_hang)
      setValue(data.data.khach_hang.chuc_vu)
      setEmail(data.data.khach_hang.email)
      setPhone(data.data.khach_hang.sdt)
      setName(data.data.khach_hang.ho_ten)
      setAddress(data.data.khach_hang.dia_chi)
      console.log(data, 'data')
      localStorage.setItem('auth', JSON.stringify(data.data.khach_hang))
      console.log(user, 'user')
    }

    // fetchData()
    // if(!localStorage.getItem('auth')) {
    //   window.location = 'http://localhost:3001/login';
    // } else {
    //   fetchData();
    // }
    fetchData();
  }, [])



  const handleRoleChange = (event) => {
    setValue(event.target.value);
  };

  const handleEmailChange = (event) => {
    console.log(event)
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setImgUrl(file);
    console.log(file);
  }

  const handleUpdateClick = (e) => {
    const id = e.target.getAttribute("name");
    console.log(id);

    if (id) {
      const postData = {
        email: email,
        sdt: phone,
        ho_ten: name,
        dia_chi: address,
        avatar: imgUrl,
        chuc_vu: value,
      };

      var form_data = new FormData();

      for (var key in postData) {
        form_data.append(key, postData[key]);
      }
      // console.log(object)
      axios.post(API_KEY + '/khach_hang/' + id + '?_method=put', form_data)
        .then(res => {
          console.log(res.data);
        })
    }
  };

  const roleName = () => {
    switch (user.chuc_vu) {
      case 0:
        return "Banned"
        break;

      case 1:
        return "Người Dùng"
        break;

      case 2:
        return "Quản Trị Viên"
        break;

      default:
        break;
    }
  }

  const disableRole = () => {
    switch (user.chuc_vu) {

      case 1:
        return false
        break;

      case 2:
        return true
        break;

      default:
        return true
        break;
    }
  }

  const setDisableRole = () => {
    switch (user.chuc_vu) {
      case 2:
        return <GridItem xs={12} sm={12} md={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Chức Vụ</FormLabel>
            <RadioGroup aria-label="gender" name="chuc_vu" value={value} onChange={handleRoleChange}>
              <FormControlLabel value="0" checked={value == 0 ? true : false} control={<Radio />} label="Banned" />
              <FormControlLabel value="1" checked={value == 1 ? true : false} control={<Radio />} label="Người Dùng" />
              <FormControlLabel value="2" checked={value == 2 ? true : false} control={<Radio />} label="Quản Trị Viên" />
            </RadioGroup>
          </FormControl>
        </GridItem>
        break;

      default:
        break;
    }
  }

  return (
    <div>
      <GridContainer>

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Chỉnh sửa thông tin</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className="form-control">
                    <InputLabel htmlFor="idUser" shrink="true">Mã Khách Hàng</InputLabel>
                    <Input
                      name="id"
                      id="idUser"
                      disabled="true"
                      fullWidth="true"
                      value={user.id} />
                  </FormControl>
                  {/* <CustomInput
                    labelText="Mã Khách Hàng (disabled)"
                    id="idUser"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  /> */}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className="form-control">
                    <InputLabel htmlFor="emailAddress" shrink="true">Email Address</InputLabel>
                    <Input
                      name="email"
                      id="emailAddress"
                      disabled={disableRole()}
                      fullWidth="true"
                      value={email}
                      onChange={handleEmailChange} />
                  </FormControl>
                  {/* <CustomInput
                    labelText="Email Address"
                    id="emailAddress"
                    inputProps={
                      {
                        value: user.email,
                        autoFocus: true

                      }
                    }
                    formControlProps={{
                      fullWidth: true
                    }}
                  /> */}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className="form-control">
                    <InputLabel htmlFor="phone" shrink="true">Số Điện Thoại</InputLabel>
                    <Input
                      name="sdt"
                      id="phone"
                      disabled={disableRole()}
                      fullWidth="true"
                      value={phone}
                      onChange={handlePhoneChange} />
                  </FormControl>
                  {/* <CustomInput
                    labelText="Số Điện Thoại"
                    id="phone"
                    inputProps={
                      {
                        value: user.sdt
                      }
                    }
                    formControlProps={{
                      fullWidth: true,
                      autoFocus: true

                    }}
                  /> */}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className="form-control">
                    <InputLabel htmlFor="name" shrink="true">Họ Tên</InputLabel>
                    <Input
                      name="ho_ten"
                      id="name"
                      disabled={disableRole()}
                      fullWidth="true"
                      value={name}
                      onChange={handleNameChange} />
                  </FormControl>
                  {/* <CustomInput
                    labelText="Họ Tên"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={
                      {
                        value: user.ho_ten,
                        autoFocus: true
                      }
                    }
                  /> */}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className="form-control">
                    <InputLabel htmlFor="address" shrink="true">Địa Chỉ</InputLabel>
                    <Input
                      name="dia_chi"
                      id="address"
                      disabled={disableRole()}
                      fullWidth="true"
                      value={address}
                      onChange={handleAddressChange} />
                  </FormControl>
                  {/* <CustomInput
                      labelText="Địa Chỉ"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={
                        {
                          value: user.dia_chi,
                          autoFocus: true

                        }
                      }
                  /> */}
                </GridItem>
                {setDisableRole()}
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" name={user.id} onClick={handleUpdateClick}>Chỉnh Sửa</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={imgUrl ? window.URL.createObjectURL(imgUrl) : blankavt} alt="..." />
              </a>
            </CardAvatar>
            <CardHeader>
              <input
                name="avatar"
                type="file"
                onChange={handleFile} />
            </CardHeader>
            <CardBody profile>
              <h6 className={classes.cardCategory}><b>{roleName()}</b></h6>
              <h4 className={classes.cardTitle}>{user.ho_ten}</h4>
              <p className={classes.description}>
                {user.dia_chi}
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  );
}
