import React, {useState, useEffect} from "react"
import PetrolTypeService from "../../../service/PetrolTypeService"
import PetrolType from "./petroltype"
import $ from "jquery";
import AppFunction from "../../app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'


// or less ideally
import { Button, Modal } from "react-bootstrap";

 const Modelform = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [petrolType, setPetrolType] = useState([]);

    const getAllPetroltype =()=>{
      PetrolTypeService.getpetroltype().then((response  ) =>{
        console.log(response.data)
        setPetrolType(response.data);
        });     
    };
    useEffect(() => {
      getAllPetroltype();
    }, []);
  
    const handleSubmitt= (e)=>{
      e.preventDefault();
      let data ={
        ptId:$("#ptid").val(),
        p_type: $("#p_type").val(),
      };
      // console.log(data);
      let inputs = AppFunction.validate_form_inputs([
        "p_type"
      ]);
      if(inputs !== null){
        PetrolTypeService.savePetroltype(data).then((response)=>{

          if ($("#ptid").val()>0) {
          toast.info('successfuly Updated ...'); 
          $("#ptid").val(0)
          }else {
            toast.success('successfuly saved ...'); 
          }
          
          getAllPetroltype();
          handleClose();
        });
      }

     
    }

    //delete  Petrol Type
    const deletePetrolType = (id) =>{
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
          PetrolTypeService.deletePetrolType(id).then((resoponse) => {
            if (resoponse.data) {
              Swal.fire(
                'Deleted!',
                'Petrol Type has been deleted.',
                'success'
              )
            }
            else {
              toast.error('Is refrenced another table')
            }
           
            getAllPetroltype();
          })
       
        }
        })
     
    }
    function validate() {
      var element = document.getElementById('p_type');
      element.value = element.value.replace(/[^a-zA-Z@]+/, '');
      
    };

    //GET PETROL TYPE BY ID
    const editPetrolType = (id) =>{
      PetrolTypeService.getPetrolTypeById(id).then(response=>{
        handleShow()
        $("#p_type").val(response.data.p_type)
        $("#ptid").val(response.data.ptId)
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
                    Add Petrol Type
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <PetrolType
        PetrolType={petrolType}
        deletePetrolType={deletePetrolType}
        editPetrolType={editPetrolType}
      />

    <ToastContainer/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Petrol Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="ptid"
            className="form-control"
            id="ptid"
            aria-describedby="empName"
            placeholder="Enter Name"
          />
            
            <div className="col-12">
              <div className="form-group">
                <label>Petrol type</label>
                <input
                  type="text"
                  className="form-control"
                  id="p_type"
                  name="p_type"
                  placeholder="Enter petrol type"
                  onKeyUp={validate}
                />
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
      <div className="contaainer"></div>
            
        </>
    )
}
export default Modelform;
