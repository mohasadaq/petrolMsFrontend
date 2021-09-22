import React,{useState,useEffect} from 'react'
import BranchSarvice from "../../../service/BranchService"
import AppFunction from "../../app"
import $ from "jquery";
import BranchHtml from './branchHtml'
import { ToastContainer, toast } from "react-toastify";

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
          <BranchHtml 
          handleShow={handleShow}
          handleClose={handleClose}
          handleSubmitt={handleSubmitt}
          ToastContainer={ToastContainer}
          branch={branch}
          editBranch={editBranch}
          deleteBranch={deleteBranch}
          show={show}
          />
        </>
    )
}
export default Modelform