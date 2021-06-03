import React, { useState, useEffect } from "react";
import BurchaseService from "../../../service/BurchaseService";
import PetroltypeService from "../../../service/PetrolTypeService";
import vendorService from "../../../service/vendorService";
import Burchase from "./Burchase";
import $ from "jquery";
import AppFunction from "../../app";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

// or less ideally
import { Button, Modal } from "react-bootstrap";

const Addpetrol = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [burchase, setBurchase] = useState([]);

  const getAllBurchase = () => {
    BurchaseService.getAllBurchase().then((response) => {
      setBurchase(response.data);
    });
  };
  useEffect(() => {
    getAllBurchase();
  }, []);

  $(document).ready(function () {
    $("#pricePerLiter,#quantity,#amountPaid").on("keyup", function () {
      let total = Number($("#pricePerLiter").val()) * Number($("#quantity").val())
      if ($("#quantity").val() == null) {
        $("#quantity").val(0);
      } else {
        $("#total_amount").text(
          Number(total)
        );
      }

      if ($('#amountPaid').val() > total)
        $('#amountPaid').val(total)
    });

  });

  // handal submitt
  const handleSubmitt = (e) => {
    e.preventDefault();
    let data = {
      pid: $("#pid").val(),
      pricePerLiter: $("#pricePerLiter").val(),
      quantity: $("#quantity").val(),
      potroltype_id: $("#potroltype_id").val(),
      vndId: $("#vndId").val(),
      amountPaid: $("#amountPaid").val(),
    };
    let inputs = AppFunction.validate_form_inputs([
      "potroltype_id",
      "quantity",
      "pricePerLiter",
    ]);
    if (inputs !== null) {
      BurchaseService.saveBurcahse(data).then((response) => {
        if ($("#pid").val() > 0) {
          toast.info("Employee Successfully  Updated ..");
          $("#pid").val(0);
        } else {
          toast.success("Employee Successfully  Saved ..");
        }
        getAllBurchase();
        handleClose();
      });
    }
  };
  // get petrol type
  const petrolType = () => {
    PetroltypeService.getpetroltype().then((response) => {
      response.data.map((petroltype) => {
        $("#potroltype_id").append(`
        <option value="${petroltype.ptId}">${petroltype.p_type}</option>
        `);
      });
    });
  };

  const vendor = () => {
    vendorService.getVendorList().then((response) => {
      response.data.map((vendor) => {
        $("#vndId").append(`
        <option value="${vendor.vId}">${vendor.vName}</option>
        `);
      });
    });
  };

  //. edite
  const editBurchase = (id) => {
    handleShow();
    vendor();
    petrolType();
    BurchaseService.getOneBurcahse(id).then((response) => {
      $("#pricePerLiter").val(response.data.pricePerLiter);
      $("#quantity").val(response.data.quantity);
      $("#pid").val(response.data.pid);
      $("#potroltype_id").val(response.data.potroltype_id).change();
      $("#vndId").val(response.data.vndId).change()
      $("#amountPaid").val(response.data.amountPaid)
      $("#total_amount").text(
        Number(response.data.quantity) * Number(response.data.pricePerLiter)
      );
    });
  };
  // delete
  const deleteBurchase = (id) => {
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
        BurchaseService.deleteBurcahse(id).then((response) => {
          Swal.fire("Deleted!", "Customer has been deleted.", "success");
          getAllBurchase();
        });
      }
    });
  };
  // const [value, setValue] = useState([]);
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
                      petrolType();
                      vendor();
                    }}
                  >
                    <i className="mdi mdi-plus-circle mr-1"></i>
                    Add Purchase
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Burchase
        burchase={burchase}
        editBurchase={editBurchase}
        deleteBurchase={deleteBurchase}
      />
      <ToastContainer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="pid"
            className="form-control"
            id="pid"
            aria-describedby="empName"
            placeholder="Enter Name"
          />
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Vendor</label>

                <select className="form-control" id="vndId">
                  <option value="">Select Vendor</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Petrol type</label>

                <select className="form-control" id="potroltype_id">
                  <option value="">Select Petrol Type</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  placeholder="Enter Quantity"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Price Per Liter</label>
                <input
                  type="number"
                  name="pricePerLiter"
                  className="form-control"
                  id="pricePerLiter"
                  aria-describedby="sname"
                  placeholder="Enter Name"
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
                  name="amountPaid"
                  className="form-control"
                  id="amountPaid"
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
  );
};
export default Addpetrol;
