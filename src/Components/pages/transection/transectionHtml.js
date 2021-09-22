import React from 'react';
import { Button, Modal } from "react-bootstrap";
import Transection from "./Transection";


const TransetionHtml = ({
    handleShow,handleClose,
    handleSubmitt,ToastContainer,
    transection,editTransection,
    deleteTransection,show,
    customer,petrolType,
    searchdate
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
                    onClick={() => {
                      handleShow();
                      customer();
                      petrolType();
                    }}
                  >
                    <i className="mdi mdi-plus-circle mr-1"></i>
                    Add Transection
                  </Button>
                </div>
              </div>
            </div>
            <div className='row'>
                <div className='col-sm-12 col-lg-4'>
                <div className="form-group">
                        <label>Date from</label>
                        <input
                          type="date"
                          name="startReading"
                          className="form-control"
                          id="datefrom"
                          aria-describedby="sname"
                          placeholder="Enter Name"
                        />
                      </div>
              </div>
                <div className='col-sm-12 col-lg-4'>
                   <div className="form-group">
                        <label>Date To</label>
                        <input
                          type="date"
                          name="startReading"
                          className="form-control"
                          id="dateto"
                          aria-describedby="sname"
                          placeholder="Enter Name"
                        />
                      </div>
                </div>
      
              <div className='col-sm-12 col-lg-4'>
                <button className='btn btn-success mt-3' onClick={searchdate}>search</button>
              </div>
           
            </div>
          </div>
        </div>
      </div>

      <Transection 
      transection={transection} 
      editTransection={editTransection} 
      deleteTransection={deleteTransection} />
      <ToastContainer />

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Transection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="trnsId"
            className="form-control"
            id="trnsId"
            aria-describedby="empName"
            placeholder="Enter Name"
          />
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Customer</label>

                <select className="form-control" id="custmrid">
                  <option value="">Select Customer</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>petrol Type</label>
                <select className="form-control" id="petroltyid">
                  <option value="">Select petrol Type</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>number of liter</label>
                <input
                  type="number"
                  name="numofliter"
                  className="form-control"
                  id="numofliter"
                  aria-describedby="sname"
                  placeholder="Enter Number of liter"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>price per liter</label>
                <input
                  type="number"
                  name="priceperLiter"
                  className="form-control"
                  id="priceperLiter"
                  aria-describedby="sname"
                  placeholder="Enter Price per liter"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <div class="row">
                  <div class="col-6">
                    <label>Amount Paid</label>
                  </div>
                  <div className="col-6 text-right">
                    <label className="">
                      <smal className="text-muted ">Total Amount</smal>
                      <strong
                        className="fa fa-dollar-sign p-1  "
                        id="total_amount"
                        style={{ fontSize: 16 }}
                      >
                        0
                      </strong>
                    </label>
                  </div>
                </div>
                <input
                  type="number"
                  name="amountpaid"
                  className="form-control"
                  id="amountpaid"
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

export default TransetionHtml