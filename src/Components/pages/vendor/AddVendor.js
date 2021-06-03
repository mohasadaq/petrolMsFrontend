import React, { useState, useEffect } from "react";
import vendorService from "../../../service/vendorService";
import Vendor from "./Vendor";
import $ from "jquery";
import AppFunction from "../../app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

// or less ideally
import { Button, Modal, Alert } from "react-bootstrap";
import BranchService from "../../../service/BranchService";

const Modelform = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [vendor, setVendor] = useState([]);
  const [showNumber, setshowNumber] = useState(0);

  const getAllVendor = () => {
    vendorService.getVendorList().then((response) => {
      setVendor(response.data);
    });
  };
  useEffect(() => {
    getAllVendor();
  }, []);

  // Get Input Submit
  const handleSubmitt = (e) => {
    e.preventDefault();
    let data = {
      vId: $("#vId").val(),
      vName: $("#vName").val(),
      vPhone: $("#vPhone").val(),
      vAddress: $("#vAddress").val(),
      vBeginingBalance: $("#vBeginingBalance").val(),
      vEmail: $("#vEmail").val(),
    };

    let inputs = AppFunction.validate_form_inputs([
      "vName",
      "vAddress",
      "vPhone",
      "vBeginingBalance",
    ]);
    if (inputs !== null) {
      vendorService.saveVendor(data).then((response) => {
        if ($("#vId").val() > 0) {
          toast.warn("vendor Successfully  Updated ..");
          $("#vId").val(0);
        } else {
          toast.success("vendor Successfully  Saved ..");
        }
        getAllVendor();
        handleClose();
      });
    }
  };

  //get One emplote
  const editVendor = (id) => {
    handleShow();
    vendorService.getVendorById(id).then((response) => {
      $("#vName").val(response.data.vName);
      $("#vPhone").val(response.data.vPhone);
      $("#vAddress").val(response.data.vAddress);
      $("#vBeginingBalance").val(response.data.vBeginingBalance);
      $("#vBeginingBalance").prop('disabled',true);
      $("#vId").val(response.data.vId);
    });
  };

  const deleteVendor = (vId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        vendorService.deleteVendor(vId).then((response) => {
          if(response.data)
          Swal.fire("Deleted!", "Vendor has been deleted.", "success");
          else
          toast.error('this vendor you can not delete it !')
          getAllVendor();
        });
      }
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
                  placeholder="Enter Tel"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Tel</label>
                <input
                  type="text"
                  className="form-control"
                  id="vPhone"
                  name="vPhone"
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
  );
};
export default Modelform;
