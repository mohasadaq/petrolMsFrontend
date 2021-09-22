import axios from "axios";
const url = "http://localhost:8800/transection";
class PetrolTypeService {
   
    getTransectionList (){
        return axios.get(`${url}/list`)
    }
    getTransectionListBydate(dates){
        return axios.post(`${url}/listbydate`,dates)
    }
    
    saveTransection(data){
        return axios.post(`${url}/save`,data)
    }

    //getTransectionById
    getTransectionById(id){
        return axios.get(`${url}/getone/${id}`);
    }

    numberOfliterRemaining(id){
        return axios.get(`http://localhost:8800/transection/ramaining/${id}`);
    }
    //deletePetrolType
    deleteTransection(id){
        return axios.delete(`${url}/delete/${id}`);
    }

}
export default new PetrolTypeService();
