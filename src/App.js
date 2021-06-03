import React from 'react';
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import {BrowserRouter as Router ,Switch , Route} from 'react-router-dom'
import Routes from './Components/Routes';
import Login from './Components/pages/login/Login'
import Layout from './Components/pages/Layout'

function App() {
    const path = window.location.pathname;
  return (
      <>
     <Routes path="/" exact component={Login} />
      {path !== '/' &&
         <Layout/>
       }  
     </>
       );
}

export default App;
