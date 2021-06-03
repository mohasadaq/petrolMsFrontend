import React, { useState, useEffect } from "react";
import MeterReadingService from "../../../service/meterReadingService";
import MeterReading from "./meterReading";
import $ from "jquery"
import AppFunction from "../../app";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import EmployeeService from "../../../service/EmployeeService";
import PetroltypeService from "../../../service/PetrolTypeService"
// or less ideally
import { Button, Modal } from "react-bootstrap";


const AddExpense = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [meterReading, setMeterReading] = useState([]);
  const [lastReading, setLastReading] = useState(0);

  const getMeterReading = () => {
    MeterReadingService.getMeterReadingList().then((response) => {
      setMeterReading(response.data);
    });
  };



  const getLastReading = () => {
    MeterReadingService.getMeterLastReading().then((response) => {
      setLastReading(response.data);
      $("#startReading").val(response.data);
      $("#startReading").prop('disabled',true);

    });
  };
  useEffect(() => {
    getMeterReading()
  }, []);


  // handal submitt
  const handleSubmitt = (e) => {
    e.preventDefault();
    let data = {
      mtrrdId: $("#mtrrdId").val(),
      empId: localStorage.getItem("empId"),
      petroltypeId: $("#petroltypeId").val(),
      startReading: $("#startReading").val(),
      endReading: $("#endReading").val(),
      pricePerltrId: $("#pricePerltrId").val()
    };
    let inputs = AppFunction.validate_form_inputs([
      "petroltypeId",
      "startReading",
      "endReading",
      'pricePerltrId'
    ]);
    if (inputs !== null) {
      MeterReadingService.saveMeterReading(data).then((response) => {
        if ($("#mtrrdId").val() > 0) {
          toast.info("meter reading Successfully  Updated ..");
          $("#mtrrdId").val(0);
        }
        else {
          toast.success("meter reading Successfully  Saved ..");
        }
        getMeterReading();
        handleClose();
      });
    }
  };

 

  // get petrol type 
  const petrolType = () => {
    PetroltypeService.getpetroltype().then(response=>{
      response.data.map((petroltype)=>{
        $("#petroltypeId").append(`
        <option value="${petroltype.ptId}">${petroltype.p_type}</option>
        `);
      })
    });
  }




  //. edite 
  const editMeterReading = (id) => {
    handleShow();
    petrolType()
    // employee()
    MeterReadingService.getMeterReadingById(id).then((response) => {
      // $("#empId").val(response.data.empId).change();
      $("#petroltypeId").val(response.data.petroltypeId).change();
      $("#mtrrdId").val(response.data.mtrrdId);
      $("#startReading").val(response.data.startReading);
      $("#endReading").val(response.data.endReading);
      $("#pricePerltrId").val(response.data.pricePerltrId);
      $("#startReading").prop('disabled',true);
      $("#endReading").prop('disabled',true);

    });
  };



  // delete
  const deleteMeterReading = (id) => {
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
        MeterReadingService.deleteMeterReading(id).then((response) => {
          Swal.fire(
            'Deleted!',
            'Customer has been deleted.',
            'success'
          )
          getMeterReading()

        });

      }
    })
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
                    onClick={()=> {
                      handleShow();
                      getLastReading()
                      petrolType()
                    }}
                  >
                    <i className="mdi mdi-plus-circle mr-1"></i>
                    Add Meter Reading
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MeterReading
        meterReading={meterReading}
        editMeterReading={editMeterReading}
        deleteMeterReading={deleteMeterReading}
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
            name="mtrrdId"
            className="form-control"
            id="mtrrdId"
            aria-describedby="empName"
            placeholder="Enter Name"
          />
          {/* <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Employee</label>

                <select className="form-control" id="empId">
                  <option value="">Select Employee</option>

                </select>
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>petrol Type</label>
                <select className="form-control" id="petroltypeId">
                  <option value="">Select petrol Type</option>

                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>start reading</label>
                <input
                  type="number"
                  name="startReading"
                  className="form-control"
                  id="startReading"
                  aria-describedby="sname"
                  placeholder="Enter Name"
                />
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>end reading</label>
                <input
                  type="number"
                  name="endReading"
                  className="form-control"
                  id="endReading"
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
                  name="pricePerltrId"
                  className="form-control"
                  id="pricePerltrId"
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
