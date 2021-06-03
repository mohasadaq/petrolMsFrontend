import React,{useState,useEffect} from 'react'
import BranchSarvice from "../../../service/BranchService"
import Branch from "./Branch"
import AppFunction from "../../app"
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

const Modelform = ()=> {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [branch, setBranch] = useState([]);


    const getallBranch = () => {
        BranchSarvice.getBranchAll().then((response)=>{
            setBranch(response.data);
        });
    }
    useEffect(() => {
        getallBranch();
      }, []);
      
      const handleSubmitt = (e) => {
        e.preventDefault();
        let data = {
          bId : $('#bId').val(),
          branchName : $('#branchName').val(),
          brancLocation : $('#brancLocation').val()
        }

        let inputs = AppFunction.validate_form_inputs(['branchName',
        'brancLocation'
        ])

        if (inputs!==null) {
            BranchSarvice.saveBranch(data).then((response)=>{
              alert(12)

              if ($('#bId').val()>0) {
              toast.info('Branch Successfully Updated ..')
              $('#bId').val(0)
              }else{
                toast.success('Branch Successfully saved ..')
              }
              getallBranch();
              handleClose()
            })
        }

      }

      //EDIT GET BRANCH BY ID
      const editBranch =(id)=>{
        handleShow()
            BranchSarvice.getBranchById(id).then(response=>{
              $('#branchName').val(response.data.branchName)
              $('#brancLocation').val(response.data.brancLocation)
              $('#bId').val(response.data.bId)
            })
      }

      // DELETE BRANCH
      const deleteBranch =(id)=>{
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
            BranchSarvice.deleteBranch(id).then(response=>{
              Swal.fire(
                'Deleted!',
                'Branch has been deleted.',
                'success'
                ) 
                getallBranch();
            })
         
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
                    Add Branch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Branch
        branch={branch}
        deleteBranch={deleteBranch}
        editBranch={editBranch}
      />

<ToastContainer/>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <input
            type="hidden"
            name="bId"
            className="form-control"
            id="bId"
            aria-describedby="expid"
            placeholder="Enter Name"
          />
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="branchName"
                  className="form-control"
                  id="branchName"
                  aria-describedby="exptype"
                  placeholder="Enter Name"
                />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="form-group">
                <label> Location </label>
                <input
                  type="text"
                  name="brancLocation"
                  className="form-control"
                  id="brancLocation"
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
      <div className="contaainer"></div>  
            
        </>
    )
}
export default Modelform