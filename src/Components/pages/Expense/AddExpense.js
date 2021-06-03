import React, { useState, useEffect } from "react";
import ExpenseService from "../../../service/ExpenseService";
import Expense from "./Expense";
import $ from "jquery"
import AppFunction from "../../app";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import BranchService from "../../../service/BranchService";
import ExpenseTypeService from "../../../service/ExpenseTypeService";

// or less ideally
import { Button, Modal } from "react-bootstrap";


const AddExpense = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [expense, setBurchase] = useState([]);

  const getAllExpense = () => {
    ExpenseService.getExpenseList().then((response) => {
      setBurchase(response.data);
    });
  };
  useEffect(() => {
    getAllExpense()
  }, []);

  // handal submitt
  const handleSubmitt = (e) => {
    e.preventDefault();
    let data = {
      expId: $("#expId").val(),
      branchId: $("#branchId").val(),
      expType: $("#expType").val(),
      expAmount: $("#expAmount").val(),

    };
    console.log(data);
    let inputs = AppFunction.validate_form_inputs([
      "branchId",
      "expType",
      "expAmount"
    ]);
    if (inputs !== null) {
      ExpenseService.saveExpense(data).then((response) => {
        if ($("#expId").val() > 0) {
          toast.info("Expense Successfully  Updated ..");
          $("#expId").val(0);
        }
        else {
          toast.success("Expense Successfully  Saved ..");
        }
        getAllExpense();
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

  // get expense type 
  const expenseType = () => {
    ExpenseTypeService.getExpenseList().then(response => {
      response.data.map((expensetype) => {
        $("#expType").append(`
        <option value="${expensetype.expid}">${expensetype.exptype}</option>
        `);
      })
    });
}




  //. edite 
  const editExpense = (id) => {
    handleShow();
    expenseType()
    branch()
    ExpenseService.getOneExpense(id).then((response) => {
      $("#branchId").val(response.data.branchId).change();
      $("#expType").val(response.data.expType).change();
      $("#expId").val(response.data.expId);
      $("#expAmount").val(response.data.expAmount);
    });
  };



  // delete
  const deleteExpense = (id) => {
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
        ExpenseService.deleteExpense(id).then((response) => {
          Swal.fire(
            'Deleted!',
            'Customer has been deleted.',
            'success'
          )
          getAllExpense()

        });

      }
    })
  };



  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="card-box">
            <div class="row">
              <div class="col-lg-8"></div>
              <div class="col-lg-4">
                <div class="text-lg-right mt-3 mt-lg-0">
                  <Button
                    variant="primary"
                    className="waves-effect waves-light float-right mt-0"
                    onClick={()=> {
                      handleShow();
                      branch()
                      expenseType()
                    }}
                  >
                    <i class="mdi mdi-plus-circle mr-1"></i>
                    Add Expense
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Expense
        expense={expense}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
      />
      <ToastContainer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="expId"
            className="form-control"
            id="expId"
            aria-describedby="empName"
            placeholder="Enter Name"
          />
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

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Expense Type</label>
                <select className="form-control" id="expType">
                  <option value="">Select Expense Type</option>

                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="expAmount"
                  className="form-control"
                  id="expAmount"
                  aria-describedby="sname"
                  placeholder="Enter Name"
                />
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
      <div className="container"></div>

    </>
  )
}
export default AddExpense;
