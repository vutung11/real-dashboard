import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { Button, Card, CardHeader, FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { useParams } from 'react-router';
import { API_KEY } from "../../shared/_constant";
import axios from 'axios'

ChangePassword.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "112px",
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

function ChangePassword(props) {
    const classes = useStyles();
    const [password, setPassword] = React.useState();
    const [oldPassword, setOldPassword] = React.useState();
    const [newPassword, setNewPassword] = React.useState();
    const [confirmPassword, setConfirmPassword] = React.useState();
    const [user, setUser] = useState({})
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                window.location = 'http://localhost:3001/login';
            }
            const data = await axios.get(`${API_KEY}/khach_hang/${id}`)
            setUser(data.data.khach_hang)
            setPassword(data.data.khach_hang.mat_khau)
            console.log(data, 'data')
            localStorage.setItem('auth', JSON.stringify(data.data.khach_hang))
            console.log(user, 'user')
        }
        fetchData();
    }, [])

    const handleOldPassChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPassChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPassChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleUpdatePassClick = (e) => {
        const id = e.target.getAttribute("name");
        console.log(id);

        if (id) {
            if (oldPassword === password) {
                if (newPassword === password) {
                    console.log("M???t Kh???u M???i C???a B???n Tr??ng V???i M???t Kh???u C??!");
                    return;
                } else {
                    if (!newPassword && !confirmPassword) {
                        console.log("M???t Kh???u Kh??ng ???????c ????? Tr???ng");
                        return;
                    } else {
                        if (newPassword === confirmPassword && (newPassword).length >= 6) {
                            // setPassword(newPassword);
                            // console.log(password);

                            const postData = {
                                mat_khau: newPassword,
                            };

                            var form_data = new FormData();

                            for (var key in postData) {
                                form_data.append(key, postData[key]);
                            }

                            if (window.confirm("M???t kh???u c???a b???n s??? ?????i!")) {
                                axios.post(API_KEY + '/khach_hang/' + id + '?_method=put', form_data)
                                    .then(res => {
                                        console.log(res.data);
                                    })
                            }
                        } else {
                            console.log("Nh???p Sai M???t Kh???u M???i V?? M???t Kh???u Ph???i Tr??n 6 K?? T???!")
                        }
                    }
                }
            } else {
                console.log("Nh???p Sai M???t Kh???u C??!")
            }
        }
    }

    return (
        <div>
            <GridContainer>
                <GridItem>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>?????i M???t Kh???u</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <FormControl>
                                        <InputLabel>M???t Kh???u C??</InputLabel>
                                        <Input id="oldPassword" name="oldPassword" type="password" onChange={handleOldPassChange} />
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <FormControl>
                                        <InputLabel>M???t Kh???u M???i</InputLabel>
                                        <Input id="newPassword" name="newPassword" type="password" onChange={handleNewPassChange} />
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <FormControl>
                                        <InputLabel>Nh???p L??? M???t Kh???u</InputLabel>
                                        <Input id="confirmPassword" name="confirmPassword" type="password" onChange={handleConfirmPassChange} />
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" name={user.id} onClick={handleUpdatePassClick}>?????i M???t Kh???u</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}

export default ChangePassword;