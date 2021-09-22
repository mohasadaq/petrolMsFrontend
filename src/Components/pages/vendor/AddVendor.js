import React, { useState, useEffect } from "react";
import vendorService from "../../../service/vendorService";
import $ from "jquery";
import AppFunction from "../../app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

// or less ideally
import VendorHtml from './vendorHtml'

const Modelform = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [vendor, setVendor] = useState([]);

  const getAllVendor = () => {
    vendorService.getVendorList().then((response) => {
      setVendor(response.data);
    });
  };
  useEffect(() => {
    getAllVendor();
  }, []);

  // Get Input Submit
  const handleSubmitt = (e) => {
    e.preventDefault();
    let data = {
      vId: $("#vId").val(),
      employeeid: localStorage.getItem("empId"),
      vName: $("#vName").val(),
      vPhone: $("#vPhone").val(),
      vAddress: $("#vAddress").val(),
      vBeginingBalance: $("#vBeginingBalance").val(),
      vEmail: $("#vEmail").val(),
    };

    let inputs = AppFunction.validate_form_inputs([
      "vName",
      "vAddress",
      "vPhone",
      "vBeginingBalance",
    ]);
    console.log(data.response)
    if (inputs !== null) {
      vendorService.saveVendor(data).then((response) => {
        if ($("#vId").val() > 0) {
          toast.warn("vendor Successfully  Updated ..");
          $("#vId").val(0);
        } else {
          toast.success("vendor Successfully  Saved ..");
        }
        getAllVendor();
        handleClose();
      });
    }
  };

  //get One emplote
  const editVendor = (id) => {
    handleShow();
    vendorService.getVendorById(id).then((response) => {
      $("#vName").val(response.data.vName);
      $("#vPhone").val(response.data.vPhone);
      $("#vAddress").val(response.data.vAddress);
      $("#vBeginingBalance").val(response.data.vBeginingBalance);
      $("#vBeginingBalance").prop('disabled',true);
      $("#vId").val(response.data.vId);
    });
  };

  const deleteVendor = (vId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        vendorService.deleteVendor(vId).then((response) => {
          if(response.data)
          Swal.fire("Deleted!", "Vendor has been deleted.", "success");
          else
          toast.error('this vendor you can not delete it !')
          getAllVendor();
        });
      }
    });

   
  };

  return (
    <>
      <VendorHtml
      handleShow={handleShow}
      handleClose={handleClose}
      handleSubmitt={handleSubmitt}
      ToastContainer={ToastContainer}
      vendor={vendor}
      deleteVendor={deleteVendor}
      editVendor={editVendor}
      show={show}
      />
    </>
  );
};
export default Modelform;
