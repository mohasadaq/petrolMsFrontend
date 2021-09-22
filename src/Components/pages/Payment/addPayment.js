import React, { useState, useEffect } from 'react'
import PaymentService from "../../../service/payments"
import Payment from "./Payment"
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import CustomerService from '../../../service/CustomerService';

import PaymentHtml from './payementHtml'


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
  const [customers, setCustomer] = useState([]);

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
    $("#custid").empty()
    CustomerService.customer_inLoan().then(response => {
      setCustomerInloan(response.data)
      const cust = response.data.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.c_id === arr.c_id)))
        $("#custid").append(`
        <option value="">select Customer</option>
        `);
      setCustomer(cust)
      console.log(customers)
      cust.map((customer) => {
        $("#custid").append(`
        <option value="${customer.c_id}">${customer.cname}</option>
        `);
      })
    });
  }

  //EDIT GET BRANCH BY ID
  const details = (id) => {
    handleShow()
    customer()
    PaymentService.PaymentDetails(id).then(response => {
      console.log(response.data)
      
      response.data.forEach(element => {
        $("#payment_details").append(
          `
          <tr>
          <td>${element.p_type}</td>
          <td>${element.numofliter}</td>
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
    <PaymentHtml 
    customerInloan={customerInloan}
    getallPayment={getallPayment}
    customers={customer}
    ToastContainer={ToastContainer}
    toast={toast}
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


 

