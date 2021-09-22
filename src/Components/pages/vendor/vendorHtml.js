import React from 'react';
import { Button, Modal } from "react-bootstrap";
import Vendor from "./Vendor";


const VendorHtml = ({
    handleShow,handleClose,
    handleSubmitt,ToastContainer,
    vendor,deleteVendor,
    editVendor,show
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
                    }}
                  >
                    <i className="mdi mdi-plus-circle mr-1"></i>
                    Add vendor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Vendor
        vendor={vendor}
        deleteVendor={deleteVendor}
        editVendor={editVendor}
      />
      <ToastContainer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="vId"
            className="form-control"
            id="vId"
            aria-describedby="vName"
            placeholder="Enter Name"
          />
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="vName"
                  className="form-control"
                  id="vName"
                  aria-describedby="vName"
                  placeholder="Enter Name"
                />
              </div>
            </div>
            </div>
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="vAddress"
                  name="vAddress"
                  placeholder="Enter Address"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="vEmail"
                  name="vEmail"
                  placeholder="Enter Email"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="vPhone"
                  name="vPhone"
                  placeholder="Enter Phone Number"
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
                  id="vBeginingBalance"
                  name="vBeginingBalance"
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
      <div className="contaainer"></div>
        </>
    )
}

export default VendorHtml