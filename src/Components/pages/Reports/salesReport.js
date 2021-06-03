import React, { useState } from "react";
import $ from "jquery";
import SalesReport from "../../../service/salesReport";

export default function salesReport() {
  SalesReport.getSalesReport().then((response) => {
    //   alert(response.data[0].Tr_Number_Of_literes_Sold)
    let tr_amount = 0;
    let mr_amount = 0;
    let i = 0;
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
      $("#transaction_tb").append(
        `<tr>
        <td>${i}</td>
        <td>${element.p_type}</td>
        <td>${element.mr_Number_Of_literes_Sold}</td>
        <td>${element.mr_Number_Of_price_literes_Sold}</td>
        </tr>`
      );
    });
  });
  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card bg-pattern">
            <div className="card-body p-0">
              <div className="text-center">
                <h4 className="mb-1 font-20">Meter Reading</h4>
                {/* <p className="text-muted  font-14">Seattle, Washington</p> */}
              </div>
              <div className="">
                <table class="table table-striped">
                  <thead className="bg-dark  " style={{ color: "white" }}>
                    <tr>
                      <th>#</th>
                      <th>Petrol Type</th>
                      <th>Liters</th>
                      <th>USD</th>
                    </tr>
                  </thead>
                  <tbody id="transaction_tb"></tbody>
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
    </div>
  );
}
