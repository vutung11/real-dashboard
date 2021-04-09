import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
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
import {API_KEY} from "../../shared/_constant";
import {useParams} from "react-router-dom";
import axios from 'axios'
import { FormControl, Input } from "@material-ui/core";

const styles = {
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
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [user, setUser] = useState({})
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if(!id) {
        window.location = 'http://localhost:3001/login';
      }
      const data = await axios.get(`${API_KEY}/khach_hang/${id}`)
      setUser(data.data)
      console.log(data, 'data')
      localStorage.setItem('auth', JSON.stringify(data.data))
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
  return (
    <div>
      <GridContainer>

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className="form-control">
                    <InputLabel htmlFor="idUser" shrink="true">Mã Khách Hàng</InputLabel>
                    <Input name="idUser" id="idUser" disabled="true" fullWidth="true"/>
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
                    <Input name="emailAddress" id="emailAddress" fullWidth="true"/>
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
                    <Input name="phone" id="phone" fullWidth="true"/>
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
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className="form-control">
                    <InputLabel htmlFor="name" shrink="true">Họ Tên</InputLabel>
                    <Input name="name" id="name" fullWidth="true"/>
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
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className="form-control">
                    <InputLabel htmlFor="address" shrink="true">Địa Chỉ</InputLabel>
                    <Input name="address" id="address" fullWidth="true"/>
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
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
