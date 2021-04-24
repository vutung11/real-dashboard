import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import axios from "axios";
import { API_KEY } from "../../shared/_constant";
import { API_KEY_IMG } from "../../shared/_constant";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";

TableList.propTypes = {

};

const styles = {
    imgUrl: {
        width: `100%`,
        height: `100%`,
    },
    overFlow: {
        overflow: `hidden`
    },
    userList: {
        backgroundImage: `linearGradient(to bottom #018994, #007882)`,
    },
    items: {
        paddingTop: `3%`,
        borderBottom: `1px solid #018994`
    }
}


const useStyles = makeStyles(styles);

function TableList(props) {
    const classes = useStyles();
    const [realData, setRealData] = useState([]);
    const typingRacing = useRef(null);
    const [filterUser, setFilterUser] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await axios.get(`${API_KEY}/khach_hang`)
                setRealData(data.data.khach_hang)
                console.log(data.data.khach_hang);
            } catch (e) {
                console.log(e)
            }
        }

        fetchApi()
    }, [])

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    // const handleDeleteUser = (dataReal) => {
    //     console.log(dataReal);
    //     const index = realData.findIndex(x => x.id === dataReal.id)
    //     // const newID = value.id
    //     // console.log(newID);
    // };

    const handleDeleteUser = (e) => {
        const id = e.target.getAttribute("name");
        if (id) {
            if (window.confirm("Bạn có muốn xóa user này?")) {
                setRealData(realData.filter(value => value.id != id));

                axios.delete(API_KEY + '/khach_hang/' + id)
                    .then(res => {
                        console.log(res);
                    })
            }
        }

        // const index = realData.findIndex(x => x.id === newID);
        // if (index < 0) return;
        // console.log(index);
    };

    let history = useHistory();
    const handleUpdateClick = (value) => {
        history.push("/admin/user/" + value.id);
    };

    return (
        <div>
            <div className={classes.userList}>
                <GridContainer container>
                    <GridItem xs={2} sm={2} md={2}>
                        <b className={classes.overFlow}>Email</b>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                        <b className={classes.overFlow}>Số Điện Thoại</b>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                        <b className={classes.overFlow}>Họ Tên</b>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                        <b className={classes.overFlow}>Địa Chỉ</b>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                        <b className={classes.overFlow}>Avatar</b>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>

                    </GridItem>
                </GridContainer>
            </div>
            {/* <GridContainer>
                <GridItem xs={1} sm={1} md={1}>
                    {realData.id && realData.id ? realData.id : ''}
                </GridItem>
            </GridContainer> */}
            {
                realData.map((value) => (
                    <div className={classes.items}>
                        <GridContainer container key={value.id} text-align-center>
                            <GridItem xs={2} sm={2} md={2}>
                                <p className={classes.overFlow}>{value.email}</p>
                            </GridItem>
                            <GridItem xs={2} sm={2} md={2}>
                                <p className={classes.overFlow}>{value.sdt}</p>
                            </GridItem>
                            <GridItem xs={2} sm={2} md={2}>
                                <p className={classes.overFlow}>{value.ho_ten}</p>
                            </GridItem>
                            <GridItem xs={2} sm={2} md={2}>
                                <p className={classes.overFlow}>{value.dia_chi}</p>
                            </GridItem>
                            <GridItem xs={1} sm={1} md={1}>
                                <p className={classes.overFlow}><img className={classes.imgUrl} src={API_KEY_IMG + value.avatar} /></p>
                            </GridItem>
                            <GridItem xs={2} sm={2} md={2}>
                                <Button variant="contained" color="primary" onClick={() => handleUpdateClick(value)}><EditIcon /></Button>
                                <Button name={value.id} onClick={handleDeleteUser}><DeleteIcon /></Button>
                            </GridItem>
                        </GridContainer>
                    </div>
                ))
            }
        </div >
    );
}

export default TableList;
