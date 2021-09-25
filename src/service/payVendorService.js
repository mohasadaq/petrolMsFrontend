import axios from 'axios'
const url = "https://petrolmanagement.herokuapp.com/payVedor";

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

    PaymentDetails(id){
        return axios.get(`${url}/details/${id}`)
      }

    
}
export default new PayVendorService ();
