import React from 'react';
import { Button, Modal } from "react-bootstrap";
import Branch from "./Branch"

const BranchHtml = ({
    handleShow,handleClose,
    handleSubmitt,ToastContainer,
    branch,editBranch,
    deleteBranch,show}) =>{

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
                  placeholder="Enter Location"
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

export default BranchHtml