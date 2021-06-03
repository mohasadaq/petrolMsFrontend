import React, { useState, useEffect } from "react";
import TransectionService from "../../../service/transectionServices";
import Transection from "./Transection";
import $ from "jquery";
import AppFunction from "../../app";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import CustomerService from "../../../service/CustomerService";
import PetroltypeService from "../../../service/PetrolTypeService";

// or less ideally
import { Button, Modal } from "react-bootstrap";

const AddExpense = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [transection, setTransection] = useState([]);

  const getTransection = () => {
    TransectionService.getTransectionList().then((response) => {
      setTransection(response.data);
    });
  };

  useEffect(() => {
    getTransection();
  }, []);



  $(document).ready(function () {
    $("#priceperLiter,#numofliter,#amountpaid").on("keyup", function () {
      let total = Number($("#priceperLiter").val()) * Number($("#numofliter").val())
      if ($("#numofliter").val() == null) {
        $("#numofliter").val(0);
      } else {
        $("#total_amount").text(
          Number(total)
        );
      }

      if ($('#amountpaid').val() > total)
        $('#amountpaid').val(total)
    });

  });


  // handal submitt
  const handleSubmitt = (e) => {
    e.preventDefault();
    let data = {
      trnsId: $("#trnsId").val(),
      custmrid: $("#custmrid").val(),
      petroltyid: $("#petroltyid").val(),
      numofliter: $("#numofliter").val(),
      priceperLiter: $("#priceperLiter").val(),
      amountpaid: $("#amountpaid").val(),
    };
    // console.log(data);
    let inputs = AppFunction.validate_form_inputs([
      "custmrid",
      "petroltyid",
      "numofliter",
      "priceperLiter",
    ]);
    if (inputs !== null) {
      TransectionService.saveTransection(data).then((response) => {
        if ($("#trnsId").val() > 0) {
          toast.info("Transection Successfully  Updated ..");
          $("#trnsId").val(0);
        } else {
          toast.success("Transection Successfully  Saved ..");
        }
        getTransection();
        handleClose();
      });
    }
  };

  const customer = () => {
    CustomerService.getCustomerList().then((response) => {
      response.data.map((customer) => {
        $("#custmrid").append(`
        <option value="${customer.cId}">${customer.cname}</option>
        `);
      });
    });
  };

  // get petrol type
  const petrolType = () => {
    PetroltypeService.getpetroltype().then((response) => {
      response.data.map((petroltype) => {
        $("#petroltyid").append(`
        <option value="${petroltype.ptId}">${petroltype.p_type}</option>
        `);
      });
    });
  };

  //. edite
  const editTransection = (id) => {
    handleShow();
    petrolType();
    customer();
    TransectionService.getTransectionById(id).then((response) => {
      $("#custmrid").val(response.data.custmrid).change();
      $("#petroltyid").val(response.data.petroltyid).change();
      $("#trnsId").val(response.data.trnsId);
      $("#numofliter").val(response.data.numofliter);
      $("#priceperLiter").val(response.data.priceperLiter);
      $("#amountpaid").val(response.data.amountpaid);
    });
  };

  // delete
  const deleteTransection = (id) => {
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
        TransectionService.deleteTransection(id).then((response) => {
          if(response.data)
          Swal.fire("Deleted!", "Transection has been deleted.", "success");
          else
          toast.error('this transaction you can not delete it ')
          getTransection();
        });
      }
    });
  };

  $(document).on('change', '#custmrid', function () {

    $(document).find('#amountpaid').val(
      Number(Number($("#priceperLiter").val() * $("#numofliter").val()))
    )
    if ($(this).val() == 1) {
      $("#priceperLiter").keyup(function () {
        $(document).find('#amountpaid').val(
          Number(Number($("#priceperLiter").val() * $("#numofliter").val()))
        )
      })
    } else {
      $('#amountpaid').val(
        0
      )
    }
  })





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
          </div>
        </div>
      </div>

      <Transection transection={transection} editTransection={editTransection} deleteTransection={deleteTransection} />
      <ToastContainer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
                  placeholder="Enter Name"
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
                  name="amountpaid"
                  className="form-control"
                  id="amountpaid"
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
export default AddExpense;
