import React from 'react'
import $ from 'jquery'
import AppFunction from "../../app"
import PaymentService from "../../../service/payments"

const PaymentHtml = ({customerInloan,getallPayment,customers,ToastContainer,toast})=>{

    const handleSubmitt = (e) => {
      e.preventDefault();
  
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
  
    // console.log(transactionPayments)
  
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
        var purchasepayedAmount = 0;
        for (let rows of $("#payment tbody").children("tr")) {
          purchasepayedAmount += Number($(rows).children('td').children('input.amountpaying').val())
        }
  
        if (purchasepayedAmount==0) {
          toast.error('Applay amount')
        } else {
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
    }
  
  
  
   
  
  
    return (
      <>   
      <ToastContainer/>
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
     
      </>
    )
  }

  export default PaymentHtml