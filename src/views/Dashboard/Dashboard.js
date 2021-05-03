import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../../shared/_constant";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import HomeIcon from '@material-ui/icons/Home';
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import { PieChart, Pie, ComposedChart, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const Title = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
    textAlign: 'center',
  },
}));
const useStyles = makeStyles(styles);

const COLORS = ["#FF8042", "#00C49F", "#FFBB28"];

export default function Dashboard() {
  const classes = useStyles();
  const TitleClass = Title();
  const [Chart, SetChart] = useState([]);
  const [CustomerChart, SetCustomerChart] = useState([]);
  const [NhaThanhCong, SetNhaThanhCong] = useState([]);
  const [TongNha, SetTongNha] = useState([]);
  const [TongKhachHang, SetTongKhachHang] = useState([]);
  const [TongDaBan, SetTongDaBan] = useState([]);
  const [TongDangBan, SetTongDangBan] = useState([]);
  const [NhieuNhaNhat, SetNhieuNhaNhat] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const Quan = await axios.get(`${API_KEY}/thong_ke/nha/quan`)
      const KhachHang = await axios.get(`${API_KEY}/thong_ke/khach_hang/thang`)
      const Nha = await axios.get(`${API_KEY}/thong_ke/nha/thang`)
      const TongNha = await axios.get(`${API_KEY}/thong_ke/nha/loai_nha`)
      const TongKhachHang = await axios.get(`${API_KEY}/thong_ke/khach_hang/tong`)
      const TongDaBan = await axios.get(`${API_KEY}/thong_ke/nha/da_ban`)
      const TongDangBan = await axios.get(`${API_KEY}/thong_ke/nha/dang_ban`)
      const NhieuNhaNhat = await axios.get(`${API_KEY}/thong_ke/nha/quan_nhieu_nhat`)
      SetChart(Quan.data)
      SetCustomerChart(KhachHang.data)
      SetNhaThanhCong(Nha.data)
      SetTongNha(TongNha.data)
      SetTongKhachHang(TongKhachHang.data)
      SetTongDaBan(TongDaBan.data)
      SetTongDangBan(TongDangBan.data)
      SetNhieuNhaNhat(NhieuNhaNhat.data)
    }

    fetchApi()
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <HomeIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Quận Nhiều Nhà</p>
              <h3 className={classes.cardTitle}>
                {NhieuNhaNhat.map((value) => (
                  <div key={value.tong_nha}>
                    {value.ten_quan}
                  </div>
                ))}
              </h3>

            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <HomeIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Tổng Nhà Đã Bán</p>
              <h3 className={classes.cardTitle}>{TongDangBan}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Tổng Nhà Đã Bán</p>
              <h3 className={classes.cardTitle}>{TongDaBan}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Số Khách Hàng Đã Dăng Kí</p>
              <h3 className={classes.cardTitle}>{TongKhachHang}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>


        <GridItem xs={12} sm={12} md={6}>

          <Card>
            <div className={TitleClass.root}>{"Số nhà mỗi quận đang bán"}</div>
            <BarChart
              width={750}
              height={400}
              data={Chart}
              margin={{
                top: 50,
                right: 30,
                left: 5,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ten_quan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tong_nha" name="Tổng Nhà" fill="#FF0C01" />

            </BarChart>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <div className={TitleClass.root}>{"Số khách hàng đăng kí mỗi tháng  "}</div>
            <LineChart
              width={750}
              height={400}
              data={CustomerChart}
              margin={{
                top: 50,
                right: 30,
                left: 5,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="thang" label="Tháng" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tong_khach_hang" name="Tổng Khách Hàng" stroke="#FF0C01  " activeDot={{ r: 8 }} />
            </LineChart>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>

          <Card>
            <div className={TitleClass.root}>{"Số Nhà mỗi tháng bán thành công"}</div>
            <ComposedChart
              layout="vertical"
              width={500}
              height={400}
              data={NhaThanhCong}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis label="Tháng" dataKey="thang" type="category" scale="band" />
              <Tooltip />
              <Legend />
              <Bar dataKey="da_ban" name="Đã bán" barSize={20} fill="#413ea0" />

            </ComposedChart>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>

          <Card>
            <div className={TitleClass.root}>{"Số Chung cư - Nhà - Đất đang bán"}</div>
            <PieChart width={800} height={400}>
              <Pie
                dataKey="tong_nha"
                nameKey="ten_loai_nha"
                isAnimationActive={false}
                data={TongNha}
                cx={380}
                cy={180}
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {TongNha.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}

              </Pie>

              <Legend />
              <Tooltip />

            </PieChart>

          </Card>
        </GridItem>

      </GridContainer>
      <GridContainer>

      </GridContainer>
    </div >
  );
}
