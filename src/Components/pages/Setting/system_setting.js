import React, { useEffect, useState } from "react";
import $ from "jquery";
import CompanyService from "../../../service/ComponayService";
import AppFunction from "../../app";
import { ToastContainer, toast } from "react-toastify";
import EmployeeService from '../../../service/EmployeeService'
import UserPrevilageService from '../../../service/userPrevilageServices'

const System_setting = () => {
  const [menue, setMenue] = useState([])
  const [subMenue, setSubMenue] = useState([])

  useEffect(() => {
    menuefunc()
    submenu()
  }, []);

  const menuefunc = () => {
    EmployeeService.getAllMenues().then(response => {
      setMenue(response.data)
    })
  }


  const submenu = () => {
    EmployeeService.getAllSubMenues().then(response => {
      setSubMenue(response.data)
    })
  }



  const submit = (e) => {
    let data = {
      cmpid: $("#cmpid").val(),
      cmpname: $("#cmpname").val(),
      cmplocation: $("#cmplocation").val(),
      cmpcity: $("#cmpcity").val(),
      cmpfooter: $("#cmpfooter").val(),
      cmpdate: $("#cmpdate").val(),
      cmpphone: $("#cmpphone").val(),
    };
    let inputs = AppFunction.validate_form_inputs([
      "cmpname",
      "cmplocation",
      "cmpcity",
      "cmpfooter",
      "cmpdate",
      "cmpphone",
    ]);

    if (inputs !== null) {
      CompanyService.saveCompanyService(data).then((response) => {

        list();
        toast.success("Company Successfully  Saved ..");
        // }
      });
    }
  };

  // handal submitt
  const list = (e) => {
    let data = {
      cmpid: $("#cmpid").val(),
      cmpname: $("#cmpname").val(),
      cmplocation: $("#cmplocation").val(),
      cmpcity: $("#cmpcity").val(),
      cmpfooter: $("#cmpfooter").val(),
      cmpdate: $("#cmpdate").val(),
      cmpphone: $("#cmpphone").val(),
    };
    CompanyService.getCompanyServiceAll().then((response) => {
      $("#cmpname").val(response.data[0].cmpname);
      $("#cmplocation").val(response.data[0].cmplocation);
      $("#cmpcity").val(response.data[0].cmpcity);
      $("#cmpfooter").val(response.data[0].cmpfooter);
      $("#cmpdate").val(response.data[0].cmpdate);
      $("#cmpphone").val(response.data[0].cmpphone);
    });
  };
  list();

  return (
    <div>
      <div className="card card-custom mr-0  ">
        <ul
          className="nav nav-tabs nav-bordered  p-1 text-white "
        // style={{ fon: "white" }}
        >
          <li className="nav-item">
            <a
              href="#Company_Details"
              data-toggle="tab"
              aria-expanded="false"
              className="nav-link active"
            >
              Company Details
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#User_Rol"
              data-toggle="tab"
              aria-expanded="true"
              className="nav-link .message"
            >
              User Roll
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#miscellaneous"
              data-toggle="tab"
              aria-expanded="true"
              className="nav-link .payment_terms"
            >
              miscellaneous
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane show  active p-3" id="Company_Details">
            <div className="row">
              <div className="col-12">
                <div className="form-group row">
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-lg-6  ">
                <div className="form-group">
                  <label for="">Organization Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-color  text-color"
                    name=""
                    id="cmpname"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="col-sm-12 col-lg-6  ">
                <div className="form-group">
                  <label for="">Footer</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-color "
                    name=""
                    id="cmpfooter"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-lg-6  ">
                <div className="form-group">
                  <label for="">Business Location</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-color "
                    name=""
                    id="cmplocation"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="col-sm-12 col-lg-6  ">
                <div className="form-group">
                  <label for="">Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm text-color "
                    name=""
                    id="cmpdate"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-lg-6  ">
                <div className="form-group">
                  <label for="">City</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-color "
                    name=""
                    id="cmpcity"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="col-sm-12 col-lg-6  ">
                <div className="form-group">
                  <label for="">Phone</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-color "
                    name=""
                    id="cmpphone"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-sm-12 col-lg-6  ">
                <button
                  onClick={() => {
                    submit();
                  }}
                  type="submit"
                  className="btn btn-primary offset-11 "
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* User Roll */}
          <div className="tab-pane show  " id="User_Rol">
            <Roles subMenue={subMenue} menue={menue} />
          </div>

        </div>

      </div>
    </div>
  );

}

const Roles = ({ menue, subMenue }) => {
  //changePerivilage

  useEffect(() => {
    employee()
  }, []);

  const changePerivilage = () => {
    let data=[];
    data.length=0
    subMenue.forEach((submenue) => {
      let submenu = submenue.text.split(' ').join('_');
      if ($('#' + submenu).is(':checked')) {
        data.push({
          subMenueId: $('#' + submenu).val(),
          empId : $('#employees').val()
        })  
      }
    })

    UserPrevilageService.save(data).then(response=>{
      toast.success('successfully')
      window.location.href=''
    })
    console.log(data)

  }

  const menuText = (id) => {
    let row = menue.map((menu) =>
      // menu.id != 1 && menu.id != 6 ? (
        <div className="col-lg-3 my-3">
          <ul className="sitemap">
            <li className="parent" data-name="dashboard">
              <a
                href="javascript: void(0);"
                className="text-uppercase font-weight-bold"
                data-toggle="collapse" href={'#' + menu.menue.split(' ').join('_')}
              >
                <i className="mdi mdi-adjust mr-1"></i>{menu.menue}
              </a>
              <ul>
                <div id={menu.menue.split(' ').join('_')} className="collapse pt-3 hide">
                  <li className="element_list">
                    {submenutext(menu.id)}
                    <ul></ul>
                  </li>
                </div>

              </ul>
            </li>
          </ul>
        </div>
    

    );

    return row;
  }


  const submenutext = (id) => {
    let data = subMenue.filter((sub) => sub.menueId == id)
    return data.map((sub) => (
      <a className="dropdown-item " href="javascript: void(0);">
        <input type="checkbox" id={sub.text.split(' ').join('_')} value={sub.id} className='mx-2' />
        {sub.text}
      </a>
    ))
  }


  const employee = ()=>{
    EmployeeService.getEmployeeList().then(response=>{
      response.data.forEach(employe=>{
        $('#employees').append(`
           <option value='${employe.emId}'>${employe.empName}</option>
        `)
      })
     
    })
  }

  return (

    <>
    <ToastContainer/>
    <div className="col-sm-12 col-md-10 col-lg-12">

      <div className="card-box" id="body">
        <div className="row">

          <div className="col-lg-4 col-sm-12">
            <label for="">Roles</label>
            <div className="options">
              <select className="form-control" id='employees' data-option="admin">
                
              </select>


            </div>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-2 p-0">
            <ul className="list-group roles"></ul>
          </div>
          <div className="col-4">
            <ul className="list-group pages_list"></ul>
          </div>
          <div className="col">
            <ul className="list-group features_list"></ul>
          </div>
        </div>


        <div className="row" id="display">
          {menuText()}

        </div>
        <div className='offset-11'>
        <button className='btn btn-success' onClick={changePerivilage}>Save</button>
      </div>
      </div>

     
    </div>
    </>
  )
}
export default System_setting;