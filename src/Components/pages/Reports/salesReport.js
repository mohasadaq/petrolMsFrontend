import React, { useState,useEffect } from "react";
import $ from "jquery";
import SalesReports from "../../../service/salesReport";
import DashboardSerice from "../../../service/dashboarService";

import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function SalesReport() {
  const [t_money, setT_money] = useState([]);
 
  useEffect(() => {
    getdata()
    getNumOfLiterSold()
    getTotalExpenses()
  }, []);

  const getdata = () => {
  DashboardSerice.getTotalMoney().then((response) => {
    amchart(response.data)
  });
  }


  const getNumOfLiterSold = () => {
    DashboardSerice.getNumberOfLiteresSold().then((response) => {
      numOfLiterSold(response.data)
    });
  }
  
  const getTotalExpenses = () => {
    DashboardSerice.getTotalExpense().then((response) => {
      expenses(response.data)
    });
    }
  

  const amchart = (res) => {
    am4core.addLicense("ch-custom-attribution");
  let chart = am4core.create("chart", am4charts.PieChart3D);
    res.forEach(test => {
      chart.data.push(
        test
      )
    })
    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "Total_Amount";
    pieSeries.dataFields.category = "branch_name";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    
    // this.chart = chart;

  }

  const numOfLiterSold = (res) => {
    let chart = am4core.create("charts", am4charts.PieChart3D);
      res.forEach(test => {
        chart.data.push(
          test
        )
      })
      // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    
    pieSeries.colors.list = [
      am4core.color("#845EC2"),
      am4core.color("#D65DB1"),
      am4core.color("#FF6F91"),
      am4core.color("#FF9671"),
      am4core.color("#FFC75F"),
      am4core.color("#F9F871"),
    ];

      pieSeries.dataFields.value = "numOfLiterSold";
      pieSeries.dataFields.category = "branch_name";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      
      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
      
      // this.chart = chart;
  
  }
  
  const expenses = (res) => {
    let chart = am4core.create("expenses", am4charts.PieChart3D);

      res.forEach(test => {
        chart.data.push(
          test
        )
      })
    
      
      // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    
    pieSeries.colors.list = [
      am4core.color("#845EC2"),
      am4core.color("#D65DB1"),
      am4core.color("#FF6F91"),
      am4core.color("#FF9671"),
      am4core.color("#FFC75F"),
      am4core.color("#F9F871"),
    ];
      pieSeries.dataFields.value = "totalExpense";
      pieSeries.dataFields.category = "branch_name";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      
      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
      
      // this.chart = chart;
  
    }

  
  return (
    <>
      <div className="row">
        <div className="col-lg-4 text-center">
          <h3>Total Money</h3>
         <div className="chart" style={{width:100 + '%' ,height:200, marginLeft:0}}></div>
        </div>

        <div className="col-lg-4 text-center">
        <h3>Number Of Liter Sold</h3>
         <div className="charts" style={{width:100 + '%' ,height:200, marginLeft:0}}></div>
        </div>

        <div className="col-lg-4 text-center">
        <h3>Expenses</h3>
         <div className="expenses" style={{width:100 + '%' ,height:200, marginLeft:0}}></div>
        </div>
        </div>
        
        
    </>
  );
}
