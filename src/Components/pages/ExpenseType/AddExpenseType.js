import React,{useState,useEffect }from 'react'
import ExpenseService from "../../../service/ExpenseTypeService"
import ExpenseList from "./ExpenseType"
import AppFunction from "../../app"
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

export const  AddExpenseType =() => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [expense, setExpense] = useState([]);

    
    const getallExpense =() =>{
      ExpenseService.getExpenseList().then((response) =>{
         setExpense(response.data)
        });
        }

    useEffect(()=>{
        getallExpense();
    },[]);
    const handleSubmitt = (e) => {
      e.preventDefault();
      let date ={
        expid:$("#expid").val(),
        exptype:$("#exptype").val(),
      };
      console.log(date)
      let inputs = AppFunction.validate_form_inputs([
        "exptype",
      ])
      if(inputs !==null){
        ExpenseService.saveExpense(date).then((response)=>{
          if($("#expid").val()>0){
            toast.info("Expense Successfully  Updated ..");
          $("#expid").val(0);
          }
          else{
          toast.success("success Expense Data ")
          }
          getallExpense()
          handleClose()
        });
      }
    }
    const editExpense =(id) =>{
      ExpenseService.getOneExpense(id).then((response)=>{
        console.log(response.data)
        handleShow();
        $("#exptype").val(response.data.exptype);
        $("#expid").val(response.data.expid);
      });      
    };
    const  deleteExpense =(expid) =>{
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
          ExpenseService.deleteExpense(expid).then((response)=>{
            console.log(response.data)
            Swal.fire(
              'Deleted!',
              'Expense Type has been deleted.',
              'success'
              ) 
            getallExpense();
  
          });
       
        }
        })

     
    }
    return (
        <>
         <div class="row">
        <div class="col-12">
          <div class="card-box">
            <div class="row">
              <div class="col-lg-8"></div>
              <div class="col-lg-4">
                <div class="text-lg-right mt-3 mt-lg-0">
                  <Button
                    variant="primary"
                    className="waves-effect waves-light float-right mt-0"
                    onClick={handleShow}
                  >
                    <i class="mdi mdi-plus-circle mr-1"></i>
                    Add Expense
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExpenseList
        expensetype={expense}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />

  <ToastContainer/>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Expense Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="cid"
            className="form-control"
            id="expid"
            aria-describedby="expid"
            placeholder="Enter Name"
          />
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Expense Type</label>
                <input
                  type="text"
                  name="exptype"
                  className="form-control"
                  id="exptype"
                  aria-describedby="exptype"
                  placeholder="Enter Name"
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
export default AddExpenseType;
