import React ,{useState,useEffect }from 'react'
import CustomerService from "../../../service/CustomerService"
import CustomerList from "./Customer";
import $ from "jquery";
import AppFunction from "../../app";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

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
      let data ={
        cId:$("#cId").val(),
        cname:$("#cname").val(),
        caddress:$("#caddress").val(),
        cphone:$("#cphone").val(),
        beginingBalance:$("#beginingBalance").val()
      };
      console.log(data);
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
    const editCustomer = (id) => {
      CustomerService.getOneCustomer(id).then((response) => {
        console.log(response.data)
      handleShow()
      $("#cname").val(response.data.cname);
      $("#caddress").val(response.data.caddress);
      $("#cphone").val(response.data.cphone);
      $("#cId").val(response.data.cId)
      $("#beginingBalance").val(response.data.beginingBalance)
      });
    };
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
         <div className="row">
        <div className="col-12">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-8"></div>
              <div className="col-lg-4">
                <div className="text-lg-right mt-3 mt-lg-0">
                  <Button
                    variant="primary"
                    className="waves-effect waves-light float-right mt-0"
                    onClick={handleShow}
                  >
                    <i className="mdi mdi-plus-circle mr-1"></i>
                    Add Customer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerList
        customer={customer}
        deleteCustomer={deleteCustomer}
        editCustomer={editCustomer}
      />


      <ToastContainer/>
      
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="cId"
            className="form-control"
            id="cId"
            aria-describedby="empName"
            placeholder="Enter Name"
          />
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="cname"
                  className="form-control"
                  id="cname"
                  aria-describedby="cname"
                  placeholder="Enter Name"
                />
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="caddress"
                  name="caddress"
                  placeholder="Enter Address"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="cphone"
                  name="cphone"
                  placeholder="Enter Tel"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Begining Balance</label>
                <input
                  type="text"
                  className="form-control"
                  id="beginingBalance"
                  name="beginingBalance"
                  placeholder="Enter Begining Balance"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitt}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>      
      <div classNameName="contaainer"></div>      
        </>
    );
};
export default AddCustomer;
