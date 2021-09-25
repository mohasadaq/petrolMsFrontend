import axios from "axios";
const url = "https://petrolmanagement.herokuapp.com/transection";
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
        return axios.get(`https://petrolmanagement.herokuapp.com/transection/ramaining/${id}`);
    }
    //deletePetrolType
    deleteTransection(id){
        return axios.delete(`${url}/delete/${id}`);
    }

}
export default new PetrolTypeService();
