import React, { Component } from "react";
import axios from 'axios'
import Appfunction from '../../app'
import $ from 'jquery'
import { ToastContainer, toast } from "react-toastify";
import EmployeeService from '../../../service/EmployeeService'

 const Login = ()=> {


const login_author = ()=>{  
  let input =  Appfunction.validate_form_inputs(['empUsername','empPassword'])
  if(input!==null){
      axios
        .post("http://localhost:8800/Employee/checklogin", {
          empUsername: $("#empUsername").val(),
          empPassword: $("#empPassword").val(),
        })
        .then((response) => {
          console.log(response.data.length);
          if (response.data.length == 0) {
            toast.error("Username ka ama password iska sax");
          } else {
            localStorage.setItem("employeeName", response.data.empName);
            localStorage.setItem("empId", response.data.emId);
            localStorage.setItem("empPassword",response.data.empPassword);
            localStorage.setItem("username", response.data.empUsername);
            localStorage.setItem("branchId", response.data.branchId);
              
              console.log(response.data)
              localStorage.setItem("usertype", response.data.usertype);
            EmployeeService.getSubMenues().then(response => {
                let submenues = response.data.filter((menue) => menue.emp_id == localStorage.getItem('empId'))
                if (submenues.length>0) {
                    window.location.href =submenues[0].link;
                } else {
                    toast.error('contact system admin')
                }
              })

          }
        });
  }

}

        return (
          <>
                <ToastContainer />
                
                <div class="limiter">
		            <div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="/assets/images/kamil.jpeg" alt="IMG"/>
				</div>

				<div class="login100-form">
					<span class="login100-form-title">
						Member Login
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" id="empUsername" placeholder="Username"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" id="empPassword" placeholder="Password"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
                        <button class="login100-form-btn" type='button' onClick={()=>{login_author()}}>
                            Login
                        </button>
                    </div>

					

					
				</div>
			</div>
                    </div>
                    
                </div>
                
                
                <div class="animation-area">
                    <ul class="box-area">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    </div>
                
         {/* <div className="account-pages mt-5 mb-5">
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6 col-xl-4">
                      <div className="card bg-pattern">

                          <div className="card-body p-4">
                              
                              <div className="text-center w-75 m-auto">
                                  <div className="auth-logo">
                                      <div  className="logo logo-dark text-center">
                                          <span className="logo-lg">
                                              <img src="../assets/images/kamil.jpeg" alt="" height="100" width="100"/>
                                          </span>
                                      </div>
                  
                                      <a href="index.html" className="logo logo-light text-center">
                                          <span className="logo-lg">
                                              <img src="../assets/images/logo-light.png" alt="" height="22"/>
                                          </span>
                                      </a>
                                  </div>
                                  <p className=" mb-4 mt-3"><strong> Petrol Managment System </strong></p>
                              </div>


                                  <div className="mb-3">
                                      <label  className="form-label">User Name</label>
                                      <input className="form-control" type="text" id="empUsername" required="" placeholder="Enter your User Name"/>
                                  </div>

                                  <div className="mb-3">
                                      <label  className="form-label">Password</label>
                                      <div className="input-group input-group-merge">
                                          <input type="password" id="empPassword" className="form-control" placeholder="Enter your password"/>
                                          <div className="input-group-text" data-password="false">
                                             <span onClick={() => {
                                            var type = document.getElementById('empPassword').type;
                                            if (type == 'password')
                                                document.getElementById('empPassword').type = 'text'
                                           else
                                             document.getElementById('empPassword').type = 'password'    
                                                
                                              }} className="password-eye"></span>
                                          </div>
                                      </div>
                                  </div>

                                  

                                  <div className="text-center d-grid">
                                      <button className="btn btn-primary" onClick={()=>{login_author()}} type="button"> Log In </button>
                                  </div>


                              <div className="text-center">
                                  <ul className="social-list list-inline mt-3 mb-0">
                                      <li className="list-inline-item">
                                          <a href="javascript" className="social-list-item border-primary text-primary"><i className="mdi mdi-facebook"></i></a>
                                      </li>
                                      <li className="list-inline-item">
                                          <a href="javascript" className="social-list-item border-danger text-danger"><i className="mdi mdi-google"></i></a>
                                      </li>
                                      <li className="list-inline-item">
                                          <a href="javascript" className="social-list-item border-info text-info"><i className="mdi mdi-twitter"></i></a>
                                      </li>
                                      <li className="list-inline-item">
                                          <a href="javascript" className="social-list-item border-secondary text-secondary"><i className="mdi mdi-github"></i></a>
                                      </li>
                                  </ul>
                              </div>

                          </div>
                      </div>

                      <div className="row mt-3">
                          <div className="col-12 text-center">
                              <p> <a href="auth-recoverpw.html" className="text-white-50 ms-1">Forgot your password?</a></p>
                              <p className="text-white-50">Don't have an account? <a href="auth-register.html" className="text-white ms-1"><b>Sign Up</b></a></p>
                          </div> 
                      </div>
                      

                  </div>
              </div>
          </div>
      </div>
      */}
            </>
        );
}

export default Login;