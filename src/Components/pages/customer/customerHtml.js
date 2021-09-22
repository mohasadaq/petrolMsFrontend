import React from 'react';
import { Button, Modal } from "react-bootstrap";
import CustomerList from "./Customer";


const CustomerHtml = ({
    handleShow,handleClose,
    handleSubmitt,ToastContainer,
    customer,deleteCustomer,
    editCustomer,show,
    validate
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
                    onClick={handleShow}
                  >
                    <i className="mdi mdi-plus-circle mr-1"></i>
                    Add Customer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerList
        customer={customer}
        deleteCustomer={deleteCustomer}
        editCustomer={editCustomer}
      />


      <ToastContainer/>
      
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="cId"
            className="form-control"
            id="cId"
            aria-describedby="empName"
            placeholder="Enter Name"
          />
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="cname"
                  className="form-control"
                  id="cname"
                  aria-describedby="cname"
                  placeholder="Enter Name"
                  onKeyUp={validate}
                />
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="caddress"
                  name="caddress"
                  placeholder="Enter Address"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="cphone"
                  name="cphone"
                  placeholder="Enter Tel"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Begining Balance</label>
                <input
                  type="text"
                  className="form-control"
                  id="beginingBalance"
                  name="beginingBalance"
                  placeholder="Enter Begining Balance"
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
      <div classNameName="contaainer"></div>      


        </>
    )
}

export default CustomerHtml