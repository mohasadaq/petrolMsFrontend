import React from "react";
import $ from "jquery";
import DashboardSerice from "../../../service/dashboarService";

const Dashboard = () => {
  //   const [totalmoney,setTotalMoney]
  DashboardSerice.getTotalMoney().then((response) => {
    $("#t_money").text(response.data);
  });

  //Number OfLiteres Sold
  DashboardSerice.getNumberOfLiteresSold().then((response) => {
    $("#n_of_l_so").text(response.data);
  });


   //total expese
   DashboardSerice.getTotalExpense().then((response) => {
    $("#totalExpese").text('$' + response.data);
  });

  //Number Of LITER REMAINING
  DashboardSerice.getNumOfLiterRemaining().then((response) => {
    // console.log(response.data)
    const newLocal = response.data.map(petrol => {
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
    $("#currentLiter").html(
      newLocal);

      // 
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
                <div className="col-6">
                  <div className="text-end">
                    <h3 className="text-dark mt-1">
                      $
                      <span data-plugin="counterup" id="t_money">
                        0
                      </span>
                    </h3>
                    <p className="text-muted mb-1 text-truncate">Total Money</p>
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
                  <div className="text-end" id='currentLiter'>
                   
                     
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
                    <i className="fe-eye font-22 avatar-title text-warning"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-end">
                    <h3 className="text-dark mt-1">
                      <span data-plugin="counterup" id='totalExpese'>0</span>
                    </h3>
                    <p className="text-muted mb-1 text-truncate">
                      Expences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};
export default Dashboard;
