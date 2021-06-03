import axios from "axios";
const url = "https://petrolmanagement.herokuapp.com/transection";
class PetrolTypeService {
   
    getLoanList (){
        return axios.get(`${url}/list`)
    }
    
    saveLoan(data){
        return axios.post(`${url}/save`,data)
    }

    //deletePetrolType
    deleteLoan(id){
        return axios.delete(`${url}/delete/${id}`);
    }

}
export default new PetrolTypeService();
