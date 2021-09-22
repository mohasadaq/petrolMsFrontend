import React ,{useState,useEffect }from 'react'
import CustomerService from "../../../service/CustomerService"
import $ from "jquery";
import AppFunction from "../../app";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomerHtml from './customerHtml'

export const AddCustomer = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [customer, setCustomer] = useState([]);


    const getallcustomer = () =>{
        CustomerService.getCustomerList().then((response)=>{
            setCustomer(response.data);
        });
    };
    useEffect(()=>{
        getallcustomer();
    },[]);
    
    const handleSubmitt = (e) => {
      e.preventDefault();
      let data = {
        employeeid: localStorage.getItem("empId"),
        cId:$("#cId").val(),
        cname:$("#cname").val(),
        caddress:$("#caddress").val(),
        cphone:$("#cphone").val(),
        beginingBalance:$("#beginingBalance").val()
      };
      // console.log(data);
      let inputs = AppFunction.validate_form_inputs([
        "cname",
        "caddress",
        "cphone"
      ]);
      if(inputs !==null ){
        CustomerService.saveCustomer(data).then((response)=>{
          if($("#cId").val()>0){
            toast.info("Customer Successfully  Updated ..");
            $("#cId").val(0);
          }
          else{
            toast.success("Customer Successfull  saved ")
          }
    
          getallcustomer();
          handleClose();
        })
      }    
  };
  

  // validate
    function validate() {
      var element = document.getElementById('cname');
      element.value = element.value.replace(/[^a-zA-Z@]+/, ' ');
  };
  
    const editCustomer = (id) => {
      CustomerService.getOneCustomer(id).then((response) => {
        console.log(response.data)
      handleShow()
      $("#cname").val(response.data.cname);
      $("#caddress").val(response.data.caddress);
      $("#cphone").val(response.data.cphone);
      $("#cId").val(response.data.cId)
        $("#beginingBalance").val(response.data.beginingBalance)
        $("#beginingBalance").prop('disabled',true)
      });
    };

    // delete customer
    const deleteCustomer = (id) =>{
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
          CustomerService.deleteCustomer(id).then((response) =>{
            if(response.data)
            Swal.fire(
              'Deleted!',
              'Customer has been deleted.',
              'success'
              ) 
            else
            toast.error('this customer you can not delete it')
            getallcustomer()
    
          });
       
        }
        })
     
    }
  


    return (
        <>
        <CustomerHtml 
        handleShow={handleShow}
        handleClose={handleClose}
        handleSubmitt={handleSubmitt}
        ToastContainer={ToastContainer}
        customer={customer}
        deleteCustomer={deleteCustomer}
        editCustomer={editCustomer}
        show={show}
        validate={validate}
        />
       </>
    );
};
export default AddCustomer;
