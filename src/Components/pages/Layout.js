import React from 'react'
import Routes from '../Routes';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
function Layout() {

    if (localStorage.getItem('empId') == 0) {
        window.location.href='/'
    }
    else {
        return (
            <>
                <div id="wrapper">
                    <Navbar />
                    <Sidebar />
                    <div className="content-page">
                        <div className="content">
                            <div className="container-fluid">

                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-box">
                                            <div className="page-title-right">
                                                <ol className="breadcrumb m-0">
                                                    <li className="breadcrumb-item"><a href="void(0);">PMS</a></li>
                                                    <li className="breadcrumb-item active">
                                                        {
                                                            (document.URL.split('/').length == 4) ? 'Dashboard' : document.URL.split('/')[3].toUpperCase()

                                                        }</li>
                                                </ol>
                                            </div>
                                            <h4 className="page-title">
                                                {
                                                    (document.URL.split('/').length == 4) ? 'Dashboard' : document.URL.split('/')[3].toUpperCase()
                                                }</h4>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Routes />
                        </div>
                    </div>
                    <div className="rightbar-overlay"></div>
                </div>
            </>
        )
    }
}
export default Layout;