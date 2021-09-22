import React from 'react';
import { Button, Modal } from "react-bootstrap";
import EmployeeList from "./Employee";


const EmployeeHtml = ({
    handleSubmitt,
    validate,
    editEmployee,
    deleteEmployee,
    ToastContainer,
    show,branch,handleClose,
    handleShow,employee
}) =>{

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

      <Modal show={show} onHide={handleClose} size='lg'>
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
                  onKeyUp={validate}
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
    )
}

export default EmployeeHtml