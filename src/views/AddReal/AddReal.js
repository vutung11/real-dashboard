import React from "react";
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
import Image from 'material-ui-image';
import banner from "assets/img/cover.jpeg";
import './styles.css';

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
    marginTop: 50,
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Realestate</h4>
              <p className={classes.cardCategoryWhite}>
                Complete Realestate Profile
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Mã Khách Hàng (disabled)"
                    id="idUser"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email Address"
                    id="emailAddress"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Số Điện Thoại"
                    id="phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Họ Tên"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Mật Khẩu"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Địa Chỉ"
                    id="address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Chức Vụ"
                    id="role"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
          <Card className={classes.cardMargin}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Realestate Banner</h4>
            </CardHeader>
            <CardBody>
              <GridItem xs={12} sm={12} md={12}>
                <Button variant="contained" component="label">
                  Thêm Banner
                  <input type="file" hidden />
                </Button>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Image className="banner" src={ banner } />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
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
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Card className={classes.cardMargin}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Realestate Images</h4>
            </CardHeader>
            <CardBody>
              <GridItem xs={12} sm={12} md={12}>
                <Button variant="contained" component="label">
                  Thêm Hình
                  <input type="file" hidden />
                </Button>
                <GridContainer >
                  <GridItem xs={3} sm={3} md={3}>
                    <Image className="imgUrl" src={ banner } />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <Image className="imgUrl" src={ banner } />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <Image className="imgUrl" src={ banner } />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <Image className="imgUrl" src={ banner } />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <Image className="imgUrl" src={ banner } />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <Image className="imgUrl" src={ banner } />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <Image className="imgUrl" src={ banner } />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <Image className="imgUrl" src={ banner } />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
