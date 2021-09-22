import axios from 'axios'
const url ="http://localhost:8800/meterReading"

class MeterReadingService {
    getMeterReadingList(){
        return axios.get(`${url}/list`);
    }

    getMeterReadingListBydate(dates){
        return axios.post(`${url}/listbydate`,dates);
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
