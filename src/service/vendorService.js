import axios from 'axios'
const url = "http://localhost:8800/vendor";

class VendorService {
  getVendorList() {
    return axios.get(`${url}/list`);
  }
  saveVendor(data) {
    return axios.post(`${url}/save`, data);
  }

  //GET ONE Vendor
  getVendorById(id) {
    return axios.get(`${url}/getOne/${id}`);
  }
  //  DELETE Vendor
  deleteVendor(id) {
    return axios.delete(`${url}/delete/${id}`);
  }

  vendor_inLoan(){
    return axios.get(`${url}/vendorInLoan`)
}
}
export default new VendorService ();
