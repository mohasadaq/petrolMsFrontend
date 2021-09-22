import React from "react";
import ReactDOM from "react-dom";
import Layout from './Components/pages/Layout'
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from './Components/Routes';
import Login from './Components/pages/login/Login'




// const element = <h1>hello World</h1>;
const path = window.location.pathname;

function App (){
  if(path=='/') {
    return(
      <Router>
        <Switch>
           <Routes path="/" exact component={Login} />
        </Switch>
      </Router>
    )
  }
else{

 return (
    <Router>
      <Switch>
        <Layout />
      </Switch>
    </Router>
 )

   }  
 
}
ReactDOM.render(
  App(),
  document.getElementById("root")
);
