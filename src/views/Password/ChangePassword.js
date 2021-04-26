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
                if (newPassword === confirmPassword) {
                    // setPassword(newPassword);
                    // console.log(password);

                    const postData = {
                        mat_khau: newPassword,
                    };

                    var form_data = new FormData();

                    for (var key in postData) {
                        form_data.append(key, postData[key]);
                    }

                    if (window.confirm("Mật khẩu của bạn sẽ đổi!")) {
                        axios.post(API_KEY + '/khach_hang/' + id + '?_method=put', form_data)
                            .then(res => {
                                console.log(res.data);
                            })
                    }

                } else {
                    console.log("Nhập Sai Mật Khẩu Mới")
                }
            } else {
                console.log("Nhập Sai Mật Khẩu Cũ")
            }
        }
    }

    return (
        <div>
            <GridContainer>
                <GridItem>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Đổi Mật Khẩu</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <FormControl>
                                        <InputLabel>Mật Khẩu Cũ</InputLabel>
                                        <Input id="oldPassword" name="oldPassword" type="password" onChange={handleOldPassChange} />
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <FormControl>
                                        <InputLabel>Mật Khẩu Mới</InputLabel>
                                        <Input id="newPassword" name="newPassword" type="password" onChange={handleNewPassChange} />
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <FormControl>
                                        <InputLabel>Nhập Lạ Mật Khẩu</InputLabel>
                                        <Input id="confirmPassword" name="confirmPassword" type="password" onChange={handleConfirmPassChange} />
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" name={user.id} onClick={handleUpdatePassClick}>Đổi Mật Khẩu</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}

export default ChangePassword;