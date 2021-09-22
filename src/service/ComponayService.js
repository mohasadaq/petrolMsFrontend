import axios from "axios";
const url = "http://localhost:8800/company";

class CompanyService {
  getCompanyServiceAll() {
    return axios.get(`${url}/list`);
  }
  saveCompanyService(data) {
    return axios.post(`${url}/save`, data);
  }

  //GET ONE CompanyService
  getCompanyServiceById(id) {
    return axios.get(`${url}/getOneCompany/${id}`);
  }

}
export default new CompanyService();
