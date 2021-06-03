import axios from 'axios'
const url = "https://petrolmanagement.herokuapp.com/userPrevilage";

class UserPrevilageService {
  getVendorList() {
    return axios.get(`${url}/list`);
  }
  save(data) {
    return axios.post(`${url}/save`, data);
  }
}
export default new UserPrevilageService ();
