import React from "react";
import { Switch, Route } from "react-router-dom";
import { Notfound } from "./NotFound";
import system_setting from "./pages/Setting/system_setting";

import Dashboard from "./pages/dashboard/dashboard";
import AddEmployee from "./pages/employee/AddEmployee";
import profile from "./pages/employee/profile/profile";
import change from "./pages/employee/profile/change";

import AddCustomer from "./pages/customer/AddCustomer";
import AddVendor from "./pages/vendor/AddVendor";

import AddExpenseType from "./pages/ExpenseType/AddExpenseType";
import AddExpense from "./pages/Expense/AddExpense";

import AddBranch from "./pages/Branch/AddBranch";
import AddBurchase from "./pages/Burchase/AddBurchase";
import AddPetrolType from "./pages/petrolType/AddPetrolType";

import AddmeterReading from "./pages/meterReading/AddMeterReading";
import AddTransection from "./pages/transection/AddTransection";
import Login from "./pages/login/Login";

import Layout from "../Components/pages/Layout";
import Payment from "../Components/pages/Payment/addPayment";
import VendorPayment from "../Components/pages/vendorPayment/addVendorPayment";
import SalesReport from "../Components/pages/Reports/salesReport";
const Routes = () => (
  <Switch>
    <Route exact path="/" exact component={Login} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/employee/add" component={AddEmployee} />

    <Route exact path="/customer/add" component={AddCustomer} />
    <Route exact path="/vendor/add" component={AddVendor} />

    <Route exact path="/expensetype/add" component={AddExpenseType} />
    <Route exact path="/expense/add" component={AddExpense} />
    <Route exact path="/branch/add" component={AddBranch} />
    <Route exact path="/petrolType/add" component={AddPetrolType} />
    <Route exact path="/burchase/add" component={AddBurchase} />
    <Route exact path="/meterReading/add" component={AddmeterReading} />
    <Route exact path="/transection/add" component={AddTransection} />
    <Route exact path="/layout" component={Layout} />
    <Route exact path="/payment/add" component={Payment} />
    <Route exact path="/salesReport" component={SalesReport} />
    <Route exact path="/system_setting" component={system_setting} />
    <Route exact path="/payvendor" component={VendorPayment} />
    <Route exact path="/profile" component={profile} />
    <Route exact path="/change" component={change} />

    <Route path="*" component={Notfound} />
  </Switch>
);
export default Routes;
