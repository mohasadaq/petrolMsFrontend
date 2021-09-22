import axios from 'axios'
const url = "http://localhost:8800/userPrevilage";

class UserPrevilageService {
  getVendorList() {
    return axios.get(`${url}/list`);
  }
  save(data) {
    return axios.post(`${url}/save`, data);
  }
}
export default new UserPrevilageService ();
