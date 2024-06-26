import axios from "axios";
const url = "https://petrolmanagement.herokuapp.com/petroltype";
class PetrolTypeService {
  getpetroltype() {
    return axios.get(`${url}/list`);
  }

  savePetroltype(data) {
    return axios.post(`${url}/save`, data);
  }

  //deletePetrolType
  deletePetrolType(id) {
    return axios.delete(`${url}/delete/${id}`);
  }

  getPetrolTypeById(id) {
    return axios.get(`${url}/getOnepetroltype/${id}`);
  }
}
export default new PetrolTypeService();
