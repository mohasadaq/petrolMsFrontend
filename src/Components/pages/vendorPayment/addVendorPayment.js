import React, { useState, useEffect } from 'react'
import PayVendorService from "../../../service/payVendorService"
import Payment from "./vendorPayment"
import AppFunction from "../../app"
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import VendorService from '../../../service/vendorService';

var used_balance = 0
var balance = 0;


const AddPayment = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [payment, setPayment] = useState([]);
  // const [balance, setBalance] = useState(0);
  // const [used_balance, setsed_balance] = useState(0);
  const [vendorInloan, setvendorInloan] = useState([]);


 


// get all payment
  const getallPayment = () => {
    PayVendorService.getPayment().then((response) => {
      setPayment(response.data);
    });
  }
  useEffect(() => {
    getallPayment();
    vendor()
  }, []);


  $(document).ready(function () {
    $('#vendorId').on('change', () => {
      const vendor = vendorInloan.filter((inLoan) => inLoan.v_id == $('#vendorId').val());
    console.log(vendor)
      
      $('#tbody').empty()
      vendor.forEach((vendor,i) => {

        $('#tbody').append(`
      <tr key=${vendor.pid}>
      <td> 
         <input type='checkbox' value='${vendor.pid}' class='checkbox'>
      </td>
      <td>${vendor.p_type}</td>
      <td>${vendor.numofliter}</td>
      <td>$${vendor.totalAmount}</td>
      <td>$${vendor.amountpaid}</td>
      <td>$${
       (i==0) ?  vendor.v_begining_balance : 0
      }</td>
      <td>$${
       (i==0) ? (vendor.totalAmount - vendor.amountpaid)+ vendor.v_begining_balance : (vendor.totalAmount - vendor.amountpaid)
      }
        
        </td>
      <td><input type='number' disabled class='form-control amountpaying'></td>
      </tr>
      `)
      })
    })

  })


 
  

  const vendor = () => {
    let ids = []
    $("#vendorId").empty()
    VendorService.vendor_inLoan().then(response => {
      setvendorInloan(response.data)
      const cust = response.data.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.c_id === arr.c_id)))
        $("#vendorId").append(`
        <option value="">select vendor</option>
        `);
      cust.map((vendor) => {
        $("#vendorId").append(`
        <option value="${vendor.v_id}">${vendor.v_name}</option>
        `);
      })
    });
  }

  //EDIT GET BRANCH BY ID
  const details = (id) => {
    handleShow()
    // customer()
    PayVendorService.PaymentDetails(id).then(response => {
      console.log(response.data)
      
      response.data.forEach(element => {
        $("#payment_details").append(
          `
          <tr>
          <td>${element.p_type}</td>
          <td>${element.quantity}</td>
          <td>${element.paying_amount}</td>
          <td>${element.amount}</td>
          <td className="text-right">${element.remaining}</td>
          </tr>
          `
        )
        
      });      

    })
  }

  // DELETE BRANCH
  const deletePayment = (id) => {
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
        PayVendorService.deletePayment(id).then(response => {
          console.log(response.data)
          Swal.fire(
            'Deleted!',
            'Branch has been deleted.',
            'success'
          )
          getallPayment();
          vendor()
        })

      }
    })

  }



  return (
    <>
      
      <Modal show={show} onHide={handleClose}
        size="lg"
      >
        
        <Modal.Header closeButton>
          <Modal.Title>Payment Detils</Modal.Title>
          
        </Modal.Header>
        
        <Modal.Body>
          <div className="row">
            <div class="col-lg-12">
            <table class="table table-striped">
               <thead class="bg-primary  " style={{color:"white"}}>
                  <tr>
                      <th>Petrol Type</th>
                      <th>Number Of Liters</th>
                    <th>Paid Amount</th>
                    <th>Amount</th>
                    <th>Remaining</th>           
                  </tr>
               </thead>
                <tbody id="payment_details" style={{fontWeight:"bold",color:"Blue"}}>
                  
                  
                      </tbody>
              </table>
              
              </div>
            </div>
        </Modal.Body>
        
        <Modal.Footer>

          <Button variant="primary btn-block " onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
        
      </Modal>      
     

    <PaymentForm 
    vendorInloan={vendorInloan}
    getallPayment={getallPayment}
    vendors={vendor}
    />
      <Payment
        payment={payment}
        deletePayment={deletePayment}
        details={details}
      />

      <ToastContainer />
    </>
  )
}
export default AddPayment;



// add payment function
const PaymentForm = ({vendorInloan,getallPayment,vendors})=>{

  const handleSubmitt = (e) => {
    e.preventDefault();
    let amount;
    const vendor = vendorInloan.filter((inLoan) => inLoan.c_id == $('#vendorId').val());

    let purchasePayments =[]
    let Payments =[]
    
    Payments.push({
      pymntid: $('#pymntid').val(),
      amount: $('#amount').val(),
      vendorId: $('#vendorId').val(),
    })

    //transections
   let rows = $("#payment tbody").children("tr");
    for (let row of rows) {
     
     let  payingAmount = $(row).children('td').children('input.amountpaying').val()
     let  purchaseId = $(row).children('td').children('input.checkbox').val()
     let  purchaseAmountRemainig = $(row).children('td').last().prev().prev().prev().prev().text().substring(1)-
     $(row).children('td').last().prev().prev().prev().text().substring(1)
     if(Number(payingAmount)>0){
        purchasePayments.push({
          purchaseId,
          payingAmount,
          vendorId : $('#vendorId').val(),
          purchaseAmountRemainig
        })
     }
   
  }

  console.log(purchasePayments)

  let formData =[] 
  formData.push(
    {
      Payments,purchasePayments
    }
  )

  console.log(formData)

    let inputs = AppFunction.validate_form_inputs(['amount',
      'vendorId'
    ])

    if (inputs !== null) {

      var purchasepayedAmount = 0;
      for (let rows of $("#payment tbody").children("tr")) {
        purchasepayedAmount += Number($(rows).children('td').children('input.amountpaying').val())
      }

      if (purchasepayedAmount==0) {
        toast.error('Applay amount')
      } else {
        PayVendorService.savePayment(formData).then((response) => {
          if ($('#pymntid').val() > 0) {
            toast.info('Paid Successfully Updated ..')
            $('#pymntid').val(0)
          } else {
            toast.success('Paid Successfully saved ..')
          }
          getallPayment();
          AppFunction.reset(['vendorId','amount'])

          for (let rows of $("#payment tbody").children("tr")) {
           $(rows).children('td').children('input.amountpaying').val('')
          $(rows).children('td').children('input.checkbox').prop('checked',false)
         }
         $("#payment tbody tr").empty()
         console.log($('a.add_btn'))

         vendors()
        })
      }
     
        
    }
  }

  return(
    <div className="card">
    <div className="card-body role_add">
      <div className="card-widgets" style={{ marginTop: -10 + 'px' }}>
        <a data-toggle="collapse" href="#add" className="btn btn-primary btn-sm text-white add_btn" role="button" aria-expanded="false" aria-controls="add">
          <i className="mdi mdi-plus"></i>
        </a>
      </div>

      <div id="add" className="collapse pt-3 hide" style={{ marginTop: 1 + '%' }}>
        <input
          type="hidden"
          name="pymntid"
          className="form-control"
          id="pymntid"
          aria-describedby="expid"
          placeholder="Enter Name"
        />
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="form-group">
              <label>vendor Payment</label>
              <select className="form-control" id="vendorId">
                <option value="">Select vendor</option>

              </select>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                id="amount"
                aria-describedby="exptype"
                placeholder="Enter Name"
              />
            </div>
          </div>
        </div>

        <div className="row">
        </div>
        <div>
          <div className="row">
            <table className="table dt-responsive nowrap" id="payment">
              <thead style={{
                backgroundColor: "#01579b", color: "#FFF"
              }}>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Number of liter</th>
                  <th>Amount</th>
                  <th>Paid Amount</th>
                  <th>begining balance</th>
                  <th>Renmaining </th>
                  <th>pay amount</th>
                </tr>
              </thead>
              <tbody id="tbody">

              </tbody>
            </table>
          </div>
          <div className="clearfix">
            <button type="button" className="btn btn-primary float-right save_btn" onClick={handleSubmitt}>
              save
                </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}


$(document).ready(() => {
  //check
  $(document).on("input", "#amount", function () {
    balance = (Number($("#amount").val()) - Number(used_balance));
  });

  $('#vendorId').on('change',function(){
    if($("#amount").val()!='')
    balance = (Number($("#amount").val()));
  })

  $("#payment tbody").on("change", "input.checkbox", function () {
    let amount = 0;

    if ($(this).is(':checked')) {
      amount = $(this).closest('tr').children('td').last().prev().text().substring(1)
      if (Number(balance) > 0) {
        if (Number(amount) > Number(balance)) {
          $(this)
            .closest("tr")
            .children("td")
            .find("input.amountpaying")
            .val(Number(balance));
          used_balance += Number(balance);
          balance -= Number(balance);
          // alert(balance)
        } else {
          $(this)
            .closest("tr")
            .children("td")
            .find("input.amountpaying")
            .val(Number(amount));
          balance -= Number(amount);
          used_balance += Number(amount);
        }
      } else {
        $(this).prop("checked", false);
      }

    } else {
      let input = $(this)
        .closest("tr")
        .children("td")
        .find("input.amountpaying");
      balance += Number($(input).val());
      used_balance -= Number($(input).val());
      $(this).closest('tr').children('td').find('input.amountpaying').val('')

    }

  })

})
 // CHECK PAYMENT


 

