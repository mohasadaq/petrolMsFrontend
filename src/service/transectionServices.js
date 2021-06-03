import axios from "axios";
const url = "http://localhost:8800/transection";
class PetrolTypeService {
   
    getTransectionList (){
        return axios.get(`${url}/list`)
    }
    
    saveTransection(data){
        return axios.post(`${url}/save`,data)
    }

    //getTransectionById
    getTransectionById(id){
        return axios.get(`${url}/getone/${id}`);
    }
    //deletePetrolType
    deleteTransection(id){
        return axios.delete(`${url}/delete/${id}`);
    }

}
export default new PetrolTypeService();
