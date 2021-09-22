import React, { useState } from "react";
import $ from "jquery";
import {Link} from 'react-router-dom'

import DashboardSerice from "../../../service/dashboarService";
import PurchaseService from "../../../service/BurchaseService";
import SalesReport from "../../../service/salesReport";



const Dashboard = () => {
  const [t_money, setT_money] = useState(0);
  const [totalExpese, setTotalExpese] = useState(0);
  const [total_faul_cost, setTotal_faul_cost] = useState(0);

  //   const [totalmoney,setTotalMoney]
  DashboardSerice.getTotalMoney().then((response) => {
    var totalmoney = 0
    response.data.forEach(response => {
      totalmoney +=response.Total_Amount
    })
    $("#t_money").text(totalmoney);

    setT_money(response.data);
  });

  //Number OfLiteres Sold
  DashboardSerice.getNumberOfLiteresSold().then((response) => {
    var numOfliterSold = 0
    response.data.forEach(response => {
      numOfliterSold += response.numOfLiterSold
      
    })
    $("#n_of_l_so").text(numOfliterSold);
  });

  //Purchase Service
  PurchaseService.getTotalCost().then((response) => {
    $("#total_faul_cost").text("$" + response.data);
    setTotal_faul_cost(response.data);
  });

  //total expese
  DashboardSerice.getTotalExpense().then((response) => {

    var totalExpense = 0
    response.data.forEach(response => {
      totalExpense += response.totalExpense
    })

    $("#totalExpese").text("$" + totalExpense);
    setTotalExpese(response.data);
  });

  //Total Revenue
  let total_Revenue = t_money - (totalExpese + total_faul_cost);
  // alert(total_Revenue);
  if (total_Revenue < 0) {
    $("#total_Revenue")
      .css("color", "red")
      .text("$" + total_Revenue);
  } else {
    $("#total_Revenue")
      .css("color", "black")
      .text("$" + total_Revenue);
  }

  //Number Of LITER REMAINING
  DashboardSerice.getNumOfLiterRemaining().then((response) => {
    // console.log(response.data)
    const newLocal = response.data.map((petrol) => {
      return `
        <h7 className="text-dark mt-1 mx-3">
        <b style={{ marginRight: 5 }} data-plugin="counterup">
          ${petrol.p_type}
        </b>
       <b> ${petrol.CURRENTliters} </b>
      </h7>
      <br>
        `;
    });
    $("#currentLiter").html(newLocal);

    const getSalesReports = () => {
      //sales report
      SalesReport.getSalesReport().then((response) => {
        let tr_amount = 0;
        let mr_amount = 0;
        let i = 0;

        $("#transections_tb").empty();
        $("#meterReading_tb").empty();
        response.data.forEach((element) => {
          i++;
          tr_amount += Number(element.tr_Amount);
          $("#tr_usd").text(tr_amount);

          mr_amount += Number(element.mr_Number_Of_price_literes_Sold);
          $("#mr_usd").text(mr_amount);

          $("#transections_tb").append(
            `<tr>
          <td>${i}</td>
          <td>${element.p_type}</td>
          <td>${element.Tr_Number_Of_literes_Sold}</td>
          <td>${element.tr_Amount}</td>

          
          </tr>`
          );
          $("#meterReading_tb").append(
            `<tr>
        <td>${i}</td>
        <td>${element.p_type}</td>
        <td>${element.mr_Number_Of_literes_Sold}</td>
        <td>${element.mr_Number_Of_price_literes_Sold}</td>
        </tr>`
          );
        });
      });
    };

    $(document).ready(() => {
      getSalesReports();
    });
  });


 

  return (
    <>
      <div className="row">

        <div className="col-md-6 col-xl-3">
          <div className="widget-rounded-circle card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="avatar-lg rounded-circle bg-soft-primary border-primary border">
                    <i className="fe-dollar-sign font-22 avatar-title text-primary"></i>
                  </div>
                </div>
                <div className="col-6 t_money">
                <Link to='/totalMoney'>
                  <div className="text-end">
                    <h3 className="text-dark mt-1">
                      $
                      <span data-plugin="counterup" id="t_money">
                        0
                      </span>
                    </h3>
                    <p className="text-muted mb-1 text-truncate">Total Money</p>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      
              
        <div className="col-md-6 col-xl-3">
          <div className="widget-rounded-circle card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="avatar-lg rounded-circle bg-soft-success border-success border">
                    <i className="fe-shopping-cart font-22 avatar-title text-success"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-end">
                    <h3 className="text-dark mt-1">
                      <span data-plugin="counterup" id="n_of_l_so">
                        0
                      </span>
                    </h3>
                    <p className="text-muted mb-1 text-truncate">
                      <b>Number of Liters Sold</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="widget-rounded-circle card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="avatar-lg rounded-circle bg-soft-info border-info border">
                    <i className="fe-bar-chart-line- font-22 avatar-title text-info"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-end" id="currentLiter">
                    <p className="text-muted mb-1 text-truncate">Conversion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="widget-rounded-circle card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="avatar-lg rounded-circle bg-soft-warning border-warning border">
                    
                    {/* <i className="bi bi-box-arrow-up-left font-22 avatar-title text-warning"></i> */}
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-end">
                    <h3 className="text-dark mt-1">
                      <span data-plugin="counterup" id="totalExpese">
                        0
                      </span>
                    </h3>
                    <p className="text-muted mb-1 text-truncate text-dark">Expenses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card bg-pattern">
            <div className="card-body p-0">
              <div className="text-center">
                <h4 className="mb-1 font-20" style={{ fontStyle: "italic" }}>
                  Total Fual costs
                </h4>
                {/* <p className="text-muted  font-14">Seattle, Washington</p> */}
              </div>
              <div className=" mb-0">
                <div class="card-deck">
                  <div class="card justify-content-center text-center">
                    <div class="card-body">
                      <h4
                        id="total_faul_cost"
                        style={{
                          fontWeight: "bold",
                          color: "blue",
                        }}
                        class="card-title"
                      ></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card bg-pattern">
            <div className="card-body p-0">
              <div className="text-center">
                <h4 className="mb-1 font-20 " style={{ fontStyle: "italic" }}>
                  Total Revenue
                </h4>
                {/* <p className="text-muted  font-14">Seattle, Washington</p> */}
              </div>
              <div className=" mb-0">
                <div class="card-deck">
                  <div class="card justify-content-center text-center">
                    <div class="card-body">
                      <h4
                        style={{
                          fontWeight: "bold",
                          color: "blue",
                        }}
                        id="total_Revenue"
                        class="card-title fa fa-dolersighn"
                      >
                        Title
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="row overflow-auto  mb-5 "
        style={{ height: 400, overFlow: "scroll" }}
      >
        <div className="col-lg-6 scrollbar scrollbar-danger">
          <div className="card bg-pattern ">
            <div className="card-body p-0">
              <div className="text-center ">
                <h4 className="mb-1 font-20">Meter Reading</h4>
                {/* <p className="text-muted  font-14">Seattle, Washington</p> */}
              </div>
              <div className=" ">
                <table class="table table-striped">
                  <thead className="bg-dark  " style={{ color: "white" }}>
                    <tr>
                      <th>#</th>
                      <th>Petrol Type</th>
                      <th>Liters</th>
                      <th>USD</th>
                    </tr>
                  </thead>
                  <tbody id="meterReading_tb"></tbody>
                </table>
              </div>

              <div className="row mt-4 text-right p-2">
                <div className="col-12">
                  <h5 className="fw-normal text-muted">Revenue (USD)</h5>
                  <h3 className="fa fa-dollar-sign" id="mr_usd">
                    0
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 ">
          <div className="card bg-pattern">
            <div className="card-body p-0">
              <div className="text-center">
                <h4 className="mb-1 font-20">Transections</h4>
              </div>
              <table class="table table-striped ">
                <thead className="bg-dark  " style={{ color: "white" }}>
                  <tr>
                    <th>#</th>
                    <th>Petrol Type</th>
                    <th>Liters</th>
                    <th>USD</th>
                  </tr>
                </thead>
                <tbody id="transections_tb"></tbody>
              </table>

              <div className="row mt-4 text-right p-2">
                <div className="col-12">
                  <h5 className="fw-normal text-muted">Revenue (USD)</h5>
                  <h3 className="fa fa-dollar-sign" id="tr_usd">
                    0
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    
    </>
  );
  
};
export default Dashboard;
