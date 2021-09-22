import React, { useState, useEffect } from "react";
import EmployeeService from "../../../service/EmployeeService";
import $ from "jquery";
import AppFunction from "../../app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

import EmployeeHtml from './employeeHtml'


// or less ideally
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
      let emp = employee.filter((em => em.empUsername == $ ("#empUsername").val()));
      if(emp.length >0 && $("#emId").val() <1)
      {
       toast.error("username exists")
      }
      else {        
     
          
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
    }
  };

  function validate() {
    var element = document.getElementById('empName');
    element.value = element.value.replace(/[^a-zA-Z@]+/, '');
  };
  
  const branch = () => {
    BranchService.getBranchAll().then(response => {
    

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

  const deleteEmployee =(empId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
      if (result.isConfirmed) {
        EmployeeService.deleteEmployee(empId).then((response) => {
          Swal.fire(
            'Deleted!',
            'Employee has been deleted.',
            'success'
            ) 
          getAllemployee();
        });
     
      }
      })
  
  }


 

  return (
    <>
     <EmployeeHtml
     handleSubmitt={handleSubmitt}
     validate={validate}
     editEmployee={editEmployee}
     deleteEmployee={deleteEmployee}
     ToastContainer={ToastContainer}
     show={show}
     branch={branch}
    showNumber={showNumber}
    handleClose={handleClose}
    handleShow={handleShow}
    employee={employee}
     />
    </>
  );
};
export default Modelform;
