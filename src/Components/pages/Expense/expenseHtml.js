import React from 'react';
import { Button, Modal } from "react-bootstrap";
import Expense from "./Expense";


const ExpenseHtml = ({
    handleShow,handleClose,
    handleSubmitt,ToastContainer,
    expense,editExpense,
    deleteExpense,show,
    expenseType
}) =>{

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
          <Modal.Title>Expense</Modal.Title>
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
                  placeholder="Enter Amount"
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

export default ExpenseHtml