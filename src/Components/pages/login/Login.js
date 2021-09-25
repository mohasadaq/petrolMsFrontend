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
        .post("https://petrolmanagement.herokuapp.com/Employee/checklogin", {
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
						 Login
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
                
         
            </>
        );
}

export default Login;
