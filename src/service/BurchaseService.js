import axios from "axios";
const url = "https://petrolmanagement.herokuapp.com/Burchase";
class BurchaseService {
  getAllBurchase() {
    return axios.get(`${url}/list`);
  }
  saveBurcahse(data) {
    return axios.post(`${url}/save`, data);
  }
  getOneBurcahse(id) {
    return axios.get(`${url}/getone/${id}`);
  }
  deleteBurcahse(id) {
    return axios.delete(`${url}/delete/${id}`);
  }
  getTotalCost() {
    return axios.get(`${url}/totalFualCost`);
  }
}
export default new BurchaseService();
