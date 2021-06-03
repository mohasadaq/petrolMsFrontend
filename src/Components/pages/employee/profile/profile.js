import React from "react";
import {Link} from 'react-router-dom'
import change from "./change";

const profile =()=> {
    change(); 
  return (
    <div>
      <div className="row justify-content-center  ">
        <div className="col-lg-8 col-xl-6 col-sm-12 ">
          <div className="card text-center">
            <div className="card-body border border-primary">
              <img
                src="../assets/images/users/user-1.jpg"
                className="rounded-circle avatar-lg img-thumbnail"
                alt="profile-image"
              />
              <h4 className="mb-0"> {localStorage.getItem("employeeName")}</h4>
              <div className="card text-left mt-3 ">
                <table className=" table table-stripped ">
                  <tbody className="">
                    <tr>
                      <td style={{ width: 70, color: "black", fontSize: 18 }}>
                        Name
                      </td>
                      <td style={{ color: "black", fontSize: 18 }}>
                        {localStorage.getItem("employeeName")}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "black", fontSize: 18 }}>Phome</td>
                      <td style={{ color: "black", fontSize: 18 }}>
                        {localStorage.getItem("empTell")}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "black", fontSize: 18 }}>Adress</td>
                      <td style={{ color: "black", fontSize: 18 }}>
                        {localStorage.getItem("empAddress")}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Link to="/change" className="text-right  m-2"onClick={()=>{change()}} style={{ color: "blue",fontSize:16 }}>
                  Change Password
                  
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default profile;
