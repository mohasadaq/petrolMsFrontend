import React, { useState, useEffect } from "react";
import TransectionService from "../../../service/transectionServices";
import $ from "jquery";
import AppFunction from "../../app";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import CustomerService from "../../../service/CustomerService";
import PetroltypeService from "../../../service/PetrolTypeService";
import DashboardSerice from "../../../service/dashboarService";

import TransetionHtml from "./transectionHtml";
// or less ideally

const AddExpense = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [transection, setTransection] = useState([]);
  const [letersRemaining, setLetersRemaining] = useState([]);

  const getTransection = () => {
    TransectionService.getTransectionList().then((response) => {
      setTransection(response.data);
    });
  };

  useEffect(() => {
    getTransection();
    getnumberOfliterRemaining()
  }, []);


  const getnumberOfliterRemaining = () => {
    DashboardSerice.getNumOfLiterRemaining().then((response) => {
      setLetersRemaining(response.data)
      console.log(response.data)
    })
  }


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


    $('#petroltyid').on('change', function () {
      let petrolRemain = letersRemaining.filter((petrol) => petrol.pt_id == $('#petroltyid').val())
      if (Number(petrolRemain[0].CURRENTliters) == 0) {
       $('#numofliter').val(0)
     }else{
      $('#numofliter').val('')
       
     }

    })

    $('#numofliter').on('keyup', function () {
      let petrolRemain = letersRemaining.filter((petrol) => petrol.pt_id == $('#petroltyid').val())
      if (Number(petrolRemain[0].CURRENTliters) == 0) {
       $('#numofliter').val(0)
     }else{
      // $('#numofliter').val('')
       
     }
    })
  });


  // handal submitt
  var emplooy = localStorage.getItem("empId");

  const handleSubmitt = (e) => {
    e.preventDefault();
    let data = {
      trnsId: $("#trnsId").val(),
      custmrid: $("#custmrid").val(),
      petroltyid: $("#petroltyid").val(),
      numofliter: $("#numofliter").val(),
      priceperLiter: $("#priceperLiter").val(),
      amountpaid: $("#amountpaid").val(),
      employeeid: emplooy,
      
    };
    //  console.log(data);
    let inputs = AppFunction.validate_form_inputs([
      "custmrid",
      "petroltyid",
      "numofliter",
      "priceperLiter",
    ]);
    if (inputs !== null) {
      if ($('#numofliter').val() == 0) {
        toast.error('No Liters remaning')

      } else {
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
  
  const searchdate = () => {
    let datefrom = $('#datefrom').val();
    let dateto = $('#dateto').val();
    let dates = [];

    let data = {
      datefrom, dateto
    }
    dates.push(data)
    console.log(dates)
    TransectionService.getTransectionListBydate(dates).then((resposne => {
      setTransection(resposne.data)
      console.log(transection)
    }))

  }

  return (
    <>
     <TransetionHtml
      handleShow={handleShow}
      handleClose={handleClose}
      handleSubmitt={handleSubmitt}
      ToastContainer={ToastContainer}
      transection={transection}
      editTransection={editTransection}
      deleteTransection={deleteTransection}
      show={show}
      customer={customer}
      petrolType={petrolType}
      searchdate={searchdate}
     /> 
    </>
  );
};
export default AddExpense;
