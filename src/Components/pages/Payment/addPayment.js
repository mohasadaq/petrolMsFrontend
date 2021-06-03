import React, { useState, useEffect } from 'react'
import PaymentService from "../../../service/payments"
import Payment from "./Payment"
import AppFunction from "../../app"
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import CustomerService from '../../../service/CustomerService';

let used_balance = 0
let balance = 0;


const AddPayment = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [payment, setPayment] = useState([]);
  // const [balance, setBalance] = useState(0);
  // const [used_balance, setsed_balance] = useState(0);
  const [customerInloan, setCustomerInloan] = useState([]);

  const getallPayment = () => {
    PaymentService.getPayment().then((response) => {
      setPayment(response.data);
    });
  }
  useEffect(() => {
    getallPayment();
    customer()
  }, []);


  $(document).ready(function () {
    $('#custid').on('change', () => {
      const customer = customerInloan.filter((inLoan) => inLoan.c_id == $('#custid').val());
      $('#tbody').empty()
      customer.forEach((customer,i) => {

        $('#tbody').append(`
      <tr key=${customer.trns_id}>
      <td> 
         <input type='checkbox' value='${customer.trns_id}' class='checkbox'>
      </td>
      <td>${customer.p_type}</td>
      <td>${customer.numofliter}</td>
      <td>$${customer.amountpaid}</td>
      <td>$${customer.totalAmount}</td>
      <td>$${
       (i==0) ?  customer.begining_balance : 0
      }</td>
      <td>$${
       (i==0) ? (customer.totalAmount - customer.amountpaid)+ customer.begining_balance : (customer.totalAmount - customer.amountpaid)
      }
        
        </td>
      <td><input type='number' disabled class='form-control amountpaying'></td>
      </tr>
      `)
      })
    })

  })


 
  

  const customer = () => {
    let ids = []
    $("#custid").empty()
    CustomerService.customer_inLoan().then(response => {
      setCustomerInloan(response.data)
      const cust = response.data.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.c_id === arr.c_id)))
        $("#custid").append(`
        <option value="">select Customer</option>
        `);
      cust.map((customer) => {
        $("#custid").append(`
        <option value="${customer.c_id}">${customer.cname}</option>
        `);
      })
    });
  }

  //EDIT GET BRANCH BY ID
  const editPayment = (id) => {
    handleShow()
    customer()
    PaymentService.getPaymentId(id).then(response => {
      console.log(response.data);
      $('#amount').val(response.data.amount)
      $('#custid').val(response.data.custid).change()
      $('#pymntid').val(response.data.pymntid)

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
        PaymentService.deletePayment(id).then(response => {
          console.log(response.data)
          Swal.fire(
            'Deleted!',
            'Branch has been deleted.',
            'success'
          )
          getallPayment();
          customer()
        })

      }
    })

  }



  return (
    <>
    <PaymentForm 
    customerInloan={customerInloan}
    getallPayment={getallPayment}
    customers={customer}
    />
      <Payment
        payment={payment}
        deletePayment={deletePayment}
        editPayment={editPayment}
      />

      <ToastContainer />
    </>
  )
}
export default AddPayment;



// add payment function
const PaymentForm = ({customerInloan,getallPayment,customers})=>{

  const handleSubmitt = (e) => {
    e.preventDefault();
    let amount;
    const customer = customerInloan.filter((inLoan) => inLoan.c_id == $('#custid').val());

    let transactionPayments =[]
    let Payments =[]
    
    Payments.push({
      pymntid: $('#pymntid').val(),
      amount: $('#amount').val(),
      cusId: $('#custid').val(),
    })

    //transections
   let rows = $("#payment tbody").children("tr");
   for (let row of rows) {
     let  payingAmount = $(row).children('td').children('input.amountpaying').val()
     let  transcId = $(row).children('td').children('input.checkbox').val()
     let  transactionAmountRemainig = $(row).children('td').last().prev().prev().prev().text().substring(1)-
     $(row).children('td').last().prev().prev().prev().prev().text().substring(1)
     if(Number(payingAmount)>0){
        transactionPayments.push({
          transcId,
          payingAmount,
          cusId : $('#custid').val(),
          transactionAmountRemainig
        })
     }
   
  }

  console.log(transactionPayments)

  let formData =[] 
  formData.push(
    {
      Payments,transactionPayments
    }
  )


    let inputs = AppFunction.validate_form_inputs(['amount',
      'custid'
    ])

    if (inputs !== null) {
     
        PaymentService.savePayment(formData).then((response) => {

          if ($('#pymntid').val() > 0) {
            toast.info('Paid Successfully Updated ..')
            $('#pymntid').val(0)
          } else {
            toast.success('Paid Successfully saved ..')
          }
          getallPayment();
          AppFunction.reset(['custid','amount'])

          for (let rows of $("#payment tbody").children("tr")) {
           $(rows).children('td').children('input.amountpaying').val('')
          $(rows).children('td').children('input.checkbox').prop('checked',false)
         }
         $("#payment tbody tr").empty()
         console.log($('a.add_btn'))
         customers()
        })
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
              <label>Customer Payment</label>
              <select className="form-control" id="custid">
                <option value="">Select customer</option>

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
                  <th>Paid Amount</th>
                  <th>Amount</th>
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

  $('#custid').on('change',function(){
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


 

