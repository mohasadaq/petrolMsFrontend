import axios from 'axios'
const url ="https://petrolmanagement.herokuapp.com/meterReading"

class MeterReadingService {
    getMeterReadingList(){
        return axios.get(`${url}/list`);
    }
    saveMeterReading(data){
        return axios.post(`${url}/save`,data)

    }

    //GET ONE BRANCH
    getMeterReadingById(id){
        return axios.get(`${url}/getbyId/${id}`)
    }
    //  DELETE BRANCH
    deleteMeterReading(id){
        return axios.delete(`${url}/delete/${id}`)
    }

    //GET LAST READING
    getMeterLastReading(){
        return axios.get(`${url}/lastreading`);
    }

}
export default new MeterReadingService ();
