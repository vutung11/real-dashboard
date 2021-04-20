/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AppsIcon from "@material-ui/icons/Apps";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Real from "views/Real/Real.js";
import RealDetail from "views/RealDetail/RealDetail.js";
import AddReal from "views/AddReal/AddReal";
import ViewReal from "views/ViewReal/ViewReal";
import EditReal from "views/EditReal/EditReal"

const dashboards = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user/:id",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/real",
    name: "Realestate",
    icon: AppsIcon,
    layout: "/admin",
    component: Real,
  },
    {
    path: "/edit/:id",
    name: "Edit",
    icon: AppsIcon,
    layout: "/admin",
    component: EditReal,
  },
  {
    path: "/home/:detail",
    name: "Real Detail",
    layout: "/admin",
    component: RealDetail,
    icon: "",
    hidden: true,
  },
  {
    path: "/addproduct",
    name: "Đăng bài",
    layout: "/admin",
    component: AddReal,
    icon: "",
    hidden: true,
  },
  {
    path: "/viewproduct",
    name: "Duyệt bài",
    layout: "/admin",
    component: ViewReal,
    icon: "",
    hidden: true,
  },
];

export default dashboards;
