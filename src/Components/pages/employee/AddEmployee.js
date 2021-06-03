import React, { useState, useEffect } from "react";
import EmployeeService from "../../../service/EmployeeService";
import EmployeeList from "./Employee";
import $ from "jquery";
import AppFunction from "../../app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from '../Layout'


// or less ideally
import { Button, Modal, Alert } from "react-bootstrap";
import BranchService from "../../../service/BranchService";

const Modelform = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [employee, setEmployee] = useState([]);
  const [showNumber, setshowNumber] = useState(0);

 
  const getAllemployee = () => {
    EmployeeService.getEmployeeList().then((response) => {
      // console.log(response.data);
      setEmployee(response.data);
    }); 
  };
  useEffect(() => {
    getAllemployee();
  }, []);

  // Get Input Submit
  const handleSubmitt = (e) => {
    e.preventDefault();
    let data = {
      emId: $("#emId").val(),
      empName: $("#empName").val(),
      empTell: $("#empTell").val(),
      empGender: $("#empGender").val(),
      empAddress: $("#empAddress").val(),
      empPassword: $("#empPassword").val(),
      empUsername: $("#empUsername").val(),
      usertype:$("#usertype").val(),
      branchId: $("#branchId").val()
    };
    let inputs = AppFunction.validate_form_inputs([
      "empName",
      "empAddress",
      "empTell",
      "usertype",
      "empGender",
      "empUsername",
      "empPassword",
      "branchId"
    ]);
    if (inputs !== null) {
      EmployeeService.saveEmployee(data).then((response) => {
        if ($("#emId").val() > 0) {
          toast.warn("Employee Successfully  Updated ..");
          $("#emId").val(0);
        } else {
          toast.success("Employee Successfully  Saved ..");
        }
        getAllemployee();
        handleClose();
      });
    }
  };

  const branch = () => {
  BranchService.getBranchAll().then(response=>{
    response.data.map((branch)=>{
      $("#branchId").append(`
      <option value="${branch.bId}">${branch.branchName}</option>
      `);
    })
  }); 
}
 

  //get One emplote   
  const editEmployee = (id) => {
    handleShow();
    branch()
    EmployeeService.getOneEmplooyee(id).then((response) => {
      $("#empName").val(response.data.empName);
      $("#empTell").val(response.data.empTell);
      $("#empGender").val(response.data.empGender).change();
      $("#empAddress").val(response.data.empAddress);
      $("#empPassword").val(response.data.empPassword);
      $("#empUsername").val(response.data.empUsername);
      $("#usertype").val(response.data.usertype);      
      $("#emId").val(response.data.emId);
       $("#branchId").val(Number(response.data.branch.bId)).change();
      setshowNumber(1)
    });
  };

  const deleteEmployee = (empId) => {
    EmployeeService.deleteEmployee(empId).then((response) => {
      toast.error("Employee deleted ..");
      getAllemployee();
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-8"></div>
              <div className="col-lg-4">
                <div className="text-lg-right mt-3 mt-lg-0">
                  <Button
                    variant="primary"
                    className="waves-effect waves-light float-right mt-0"
                    onClick={()=> {
                      handleShow();
                      branch()
                    }}
                  >
                    <i className="mdi mdi-plus-circle mr-1"></i>
                    Add Employee
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmployeeList
        employee={employee}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />
      <ToastContainer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="empId"
            className="form-control"
            id="emId"
            aria-describedby="empName"
            placeholder="Enter Name"
          />
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="empName"
                  className="form-control"
                  id="empName"
                  aria-describedby="empName"
                  placeholder="Enter Name"
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="empAddress"
                  name="empAddress"
                  placeholder="Enter Address"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Tel</label>
                <input
                  type="text"
                  className="form-control"
                  id="empTell"
                  name="empTell"
                  placeholder="Enter Tel"
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Gender</label>

                <select className="form-control" id="empGender">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="empUsername"
                  name="empUsername"
                  placeholder="Enter Username"
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="empPassword"
                  name="empPassword"
                  placeholder="Enter Password"
                />
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col-12">
              <div className="form-group">
                <label>User Type</label>

                <select className="form-control" id="usertype">
                  <option value="">Select user type</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>
            </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Branch</label>

                <select className="form-control" id="branchId">
                  <option value="">Select Branch</option>
                 
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitt}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="contaainer"></div>
    </>
  );
};
export default Modelform;
