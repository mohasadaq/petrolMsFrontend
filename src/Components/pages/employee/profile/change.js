import React from 'react'
import $ from "jquery";
import AppFunction from "../../../app";
import employee from "../../../../service/EmployeeService";
export default function change() {
    let empId = localStorage.getItem("empId");
    let empPasswordone = localStorage.getItem("empPassword");
    const change =(e)=>{
        
          let oldpassword = $("#oldpassword").val();
          let empPassword = $("#empPassword").val();
          let  conform = $("#conform").val();  
          if(empPasswordone == oldpassword) {
            if(empPassword == conform)
            {
               
                let data={
                  empId,
                  empPassword,
                }
                employee.changepassword(data).then((response)=>{
                  alert("successfull");

                });
            }
            else{
                alert("incorrect new password and conform")
            }

          }
          else{
              alert("incorrect password");
          }
          
          
        let inputs = AppFunction.validate_form_inputs([
            "oldpassword",
            "empPassword",
            "conform"
          ]);
          if(inputs !== null)
          {

          }

        // e.preventDefault();
        // let data = {
        //     oldpassword:$("#oldpassword").val()
        // };
        // console.log(data);
    }
    return (
        <>
        <div className="col-lg-6 col-xl-6 col-sm-12 offset-3 ">
        <div className="card justfy-content-center p-4"> 
        <p  className="col-12 bg-dark ">
            <h4 style={{color:"white"}} className="text-center ">Change Password</h4>
        </p>
            <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Old password</label>
                <input
                  type="text"
                  name="oldpassword"
                  className="form-control"
                  id="oldpassword"
                  aria-describedby="empName"
                  placeholder="Enter Old Password"
                />
              </div>
            </div>
          </div>
            <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="text"
                  name="empPassword"
                  className="form-control"
                  id="empPassword"
                  aria-describedby="empName"
                  placeholder="Enter New Password"
                />
              </div>
            </div>

             </div>
             <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Conform</label>
                <input
                  type="text"
                  name="conform"
                  className="form-control"
                  id="conform"
                  aria-describedby="conform"
                  placeholder="Enter Conform"
                />
              </div>
            </div>

             </div>
          
          <button className="btn btn-primary"onClick={()=>{change()}} type="button" > change </button>
          </div>
          </div>
        </>
    )
}
