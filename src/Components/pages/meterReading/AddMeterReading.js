import React, { useState, useEffect } from "react";
import MeterReadingService from "../../../service/meterReadingService";
import DashboardSerice from "../../../service/dashboarService";
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


const AddMeterReading = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [meterReading, setMeterReading] = useState([]);
  const [letersRemaining, setLetersRemaining] = useState([]);
  const [lastReading, setLastReading] = useState(0);

  const getMeterReading = () => {
    MeterReadingService.getMeterReadingList().then((response) => {
      setMeterReading(response.data);
    });

  };
  

  const getLastReading = () => {
    MeterReadingService.getMeterLastReading().then((response) => {
      setLastReading(response.data);
      let lastReading = response.data.filter(reading => reading.branch_id
        == localStorage.getItem("branchId"))
      
        if(lastReading.length){
          $("#startReading").val(lastReading[0].end_reading);
          $("#startReading").prop('disabled',true);
        }

    });
  };

  useEffect(() => {
    getMeterReading()
    getnumberOfliterRemaining()
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
      if ($('#endReading').val() == 0) {
        toast.error('No Liters remaning')
      } else {
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
     
    }
  };



  // get petrol type 
  const petrolType = () => {
    PetroltypeService.getpetroltype().then(response => {
      console.log(response.data);
      response.data.map((petroltype)=>{
        $("#petroltypeId").append(`
        <option value="${petroltype.ptId}">${petroltype.p_type}</option>
        `);
      })
    });
  }

  const searchdate = () => {
    let datefrom = $('#datefrom').val();
    let dateto = $('#dateto').val();
    let dates = [];

    let data = {
      datefrom,dateto
    }
    dates.push(data)
    MeterReadingService.getMeterReadingListBydate(dates).then((resposne => {
      setMeterReading(resposne.data)
      console.log(meterReading)
    }))

    
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
      //$("#endReading").prop('disabled',true);

    });
  };

  //numberOfliterRemaining
  const getnumberOfliterRemaining = () => {
    DashboardSerice.getNumOfLiterRemaining().then((response) => {
      setLetersRemaining(response.data)
    })
  }

  $(document).ready(() => {
    $('#petroltypeId').on('change', function () {
      let petrolRemain = letersRemaining.filter((petrol) => petrol.pt_id == $('#petroltypeId').val())
      if (Number(petrolRemain[0].CURRENTliters) == 0) {
       $('#endReading').val(0)
     }else{
      $('#endReading').val('')
       
     }

    })

    $('#endReading').on('keyup', function () {
      let petrolRemain = letersRemaining.filter((petrol) => petrol.pt_id == $('#petroltypeId').val())

    
      if (Number(petrolRemain[0].CURRENTliters) == 0) {
       $('#endReading').val(0)
     }else{
      // $('#endReading').val('')
       
     }
    })
  })


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
            'Meter Reading has been deleted.',
            'success'
          )
          getMeterReading()

        });

      }
    })
  };


  const usertypedata = () => {

    // alert(localStorage.getItem("usertype"))

    if (localStorage.getItem("usertype") != 'Admin') {
      console.log(meterReading)
      return meterReading.filter((emp => emp.empId == localStorage.getItem("empId")));
      
    }

    else {
      return meterReading
    }
  }

  // console.log(usertypedata())

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

      <MeterReading
        meterReading={usertypedata()}
        editMeterReading={editMeterReading}
        deleteMeterReading={deleteMeterReading}
      />
      <ToastContainer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Meter Reading</Modal.Title>
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
                  placeholder="Enter Start Reading"
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
                  placeholder="Enter End Reading"
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
                  placeholder="Enter Price Per liter"
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
export default AddMeterReading;
