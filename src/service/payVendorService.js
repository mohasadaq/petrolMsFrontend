import axios from 'axios'
const url = "http://localhost:8800/payVedor";

class PayVendorService {
    getPayment(){
        return axios.get(`${url}/list`);
    }
    savePayment(data){
        
        return axios.post(`${url}/save`,data)
    }

    //  DELETE BRANCH
    deletePayment(id){
        return axios.delete(`${url}/delete/${id}`)
    }
}
export default new PayVendorService ();
