import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EmployeeService from '../service/EmployeeService'
import $ from 'jquery'
const Sidebar = () => {
  const [menue, setMenue] = useState([])
  const [subMenue, setSubMenue] = useState([])
  useEffect(() => {
    submenu()
    menuefunc()
  }, []);

  const menuefunc = () => {
    EmployeeService.getMenues(localStorage.getItem('empId')).then(response => {
      setMenue(response.data)
    })
  }

  //
  const submenu = () => {
    EmployeeService.getSubMenues().then(response => {
      let submenues = response.data.filter((menue)=> menue.emp_id==localStorage.getItem('empId'))
      if(submenues.length<1) {    
        toast.error('Contact System Admin')
        window.location.href='/'
      }
      setSubMenue(submenues)
    })
  }

  const submenutext = (id) => {
    let data = subMenue.filter((sub) => sub.menueId==id)
     return data.map((sub) => (
              <Link className="dropdown-item " to={sub.link}>
                <i className={sub.icon}></i>
                {sub.text}
              </Link>
            ))
  }



  const menueText = () => {
    let row = menue.map((menu) =>
      menu.id != 1 && menu.id != 6 ? (
        <li className="nav-item dropdown" id={menu.menue}>
          <a
            className="nav-link dropdown-toggle arrow-none"
            href="#"
            id="topnav-apps"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className={menu.icon}></i> {menu.menue}
            <div className="arrow-down"></div>
          </a>
          <div className="dropdown-menu" aria-labelledby="topnav-apps">
            {submenutext(menu.id)}
          </div>
        </li>
      ) : (
        <Link
          className="nav-link dropdown-toggle arrow-none"
          id={menu.menue}
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          to={menu.link}
        >
          <i className={menu.icon}></i> {menu.menue}
        </Link>
        
      )
    );

    return row;
  }

  return (
    <>
      <div className="topnav shadow-lg">
        <div className="container-fluid">
          <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
            <div className="collapse navbar-collapse" id="topnav-menu-content">
              <ul className="navbar-nav" id="ulMenue">
                {
                  menueText()
                }
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
