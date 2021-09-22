import React, { useState, useEffect } from "react";
import ExpenseService from "../../../service/ExpenseService";
import $ from "jquery"
import AppFunction from "../../app";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import ExpenseTypeService from "../../../service/ExpenseTypeService";
import ExpenseHtml from './expenseHtml'
// or less ideally


const AddExpense = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [expense, setBurchase] = useState([]);

  const getAllExpense = () => {
    ExpenseService.getExpenseList().then((response) => {
      setBurchase(response.data);
      console.log(response.data)
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
      employeeid: localStorage.getItem("empId"),
      expType: $("#expType").val(),
      expAmount: $("#expAmount").val(),

    };
    // console.log(data);
    let inputs = AppFunction.validate_form_inputs([
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
    ExpenseService.getOneExpense(id).then((response) => {
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
            'Expense has been deleted.',
            'success'
          )
          getAllExpense()

        });

      }
    })
  };



  return (
    <>
     <ExpenseHtml
     handleShow={handleShow}
     handleClose={handleClose}
     handleSubmitt={handleSubmitt}
     ToastContainer={ToastContainer}
     expense={expense}
     editExpense={editExpense}
     deleteExpense={deleteExpense}
     show={show}
     expenseType={expenseType}
     />
    </>
  )
}
export default AddExpense;
