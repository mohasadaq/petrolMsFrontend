import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
      <>
        <div className="navbar-custom">
          <div className="container-fluid">
            <ul className="list-unstyled topnav-menu float-right mb-0">
              <li className="d-none d-lg-block">
                <form className="app-search">
                  <div className="app-search-box dropdown">
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search..."
                        id="top-search"
                      />
                      <div className="input-group-append">
                        <button className="btn" type="submit">
                          <i className="fe-search"></i>
                        </button>
                      </div>
                    </div>
                    <div
                      className="dropdown-menu dropdown-lg"
                      id="search-dropdown"
                    >
                      <div className="dropdown-header noti-title">
                        <h5 className="text-overflow mb-2">Found 22 results</h5>
                      </div>

                      <a href="void(0);" className="dropdown-item notify-item">
                        <i className="fe-home mr-1"></i>
                        <span>Analytics Report</span>
                      </a>

                      <a href="void(0);" className="dropdown-item notify-item">
                        <i className="fe-aperture mr-1"></i>
                        <span>How can I help you?</span>
                      </a>

                      <a href="void(0);" className="dropdown-item notify-item">
                        <i className="fe-settings mr-1"></i>
                        <span>User profile settings</span>
                      </a>

                      <div className="dropdown-header noti-title">
                        <h6 className="text-overflow mb-2 text-uppercase">
                          Users
                        </h6>
                      </div>

                      <div className="notification-list">
                        <a
                          href="void(0);"
                          className="dropdown-item notify-item"
                        >
                          <div className="media">
                            {/* <img className="d-flex mr-2 rounded-circle" src="../assets/images/users/user-2.jpg" alt="Generic placeholder image" height="32"/> */}
                            <h3>Petrol Managemnet System</h3>
                            <div className="media-body">
                              <h5 className="m-0 font-14">Erwin E. Brown</h5>
                              <span className="font-12 mb-0">UI Designer</span>
                            </div>
                          </div>
                        </a>

                        <a
                          href="void(0);"
                          className="dropdown-item notify-item"
                        >
                          <div className="media">
                            {/* <img className="d-flex mr-2 rounded-circle" src="../assets/images/users/user-5.jpg" alt="Generic placeholder image" height="32"/> */}
                            <h3>Petrol Managemnet System</h3>

                            <div className="media-body">
                              <h5 className="m-0 font-14">Jacob Deo</h5>
                              <span className="font-12 mb-0">Developer</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </li>

              <li className="dropdown d-inline-block d-lg-none">
                <a
                  className="nav-link dropdown-toggle arrow-none waves-effect waves-light"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <i className="fe-search noti-icon"></i>
                </a>
                <div className="dropdown-menu dropdown-lg dropdown-menu-right p-0">
                  <form className="p-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search ..."
                      aria-label="Recipient's username"
                    />
                  </form>
                </div>
              </li>

              <li className="dropdown notification-list topbar-dropdown">
                <a
                  className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <img
                    src="../assets/images/users/user-1.jpg"
                    alt="user-image"
                    className="rounded-circle"
                  />
                  <span className="pro-user-name ml-1">
                    {localStorage.getItem("employeeName")}{" "}
                    <i className="mdi mdi-chevron-down"></i>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                  <div className="dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome !</h6>
                  </div>

                  <Link to="/profile" className="dropdown-item notify-item">
                    <i className="fe-user"></i>
                    <span>My Account</span>
                  </Link>

                  <a href="void(0);" className="dropdown-item notify-item">
                    <i className="fe-settings"></i>
                    <span>Settings</span>
                  </a>

                  <a href="void(0);" className="dropdown-item notify-item">
                    <i className="fe-lock"></i>
                    <span>Lock Screen</span>
                  </a>

                  {/* <div className="dropdown-divider"></div> */}

                  <Link
                    to="/"
                    onClick={() => {
                      window.location.href = "/";
                      localStorage.setItem("empId", 0);
                    }}
                    className="dropdown-item notify-item"
                  >
                    <i className="fe-log-out"></i>
                    <span>Logout</span>
                  </Link>
                </div>
              </li>

              <li className="dropdown notification-list">
                <a
                  href="void(0);"
                  className="nav-link right-bar-toggle waves-effect waves-light"
                >
                  <i className="fe-settings noti-icon"></i>
                </a>
              </li>
            </ul>

            <div className="logo-box">
              <a href="index.html" className="logo logo-dark text-center">
                <span className="logo-sm">
                  {/* <img src="../assets/images/logo-sm.png" alt="" height="22" /> */}
                  <h3>Petrol Managemnet System</h3>

                  <span className="logo-lg-text-light">Petrol</span>
                </span>
                <span className="logo-lg">
                  {/* <img
                    src="../assets/images/logo-dark.png"
                    alt=""
                    height="20"
                  /> */}
                  <h3>Petrol Managemnet System</h3>

                  {/* <span className="logo-lg-text-light">U</span>  */}
                </span>
              </a>

              <a href="index.html" className="logo logo-light text-center">
                <span className="logo-sm">
                  <img src="../assets/images/logo-sm.png" alt="" height="22" />
                </span>
                <span className="logo-lg">
                  {/* <img
                    src="../assets/images/logo-light.png"
                    alt=""
                    height="20"
                  /> */}
                  <h3 className="text-white mt-3">P M S </h3>
                </span>
              </a>
            </div>

            <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
              <li>
                <button className="button-menu-mobile waves-effect waves-light">
                  <i className="fe-menu"></i>
                </button>
              </li>

              <li>
                <a
                  className="navbar-toggle nav-link"
                  data-toggle="collapse"
                  data-target="#topnav-menu-content"
                >
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </a>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
        </div>
      </>
    );
};
export default Navbar;