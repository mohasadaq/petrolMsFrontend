import axios from 'axios'
const url = "https://petrolmanagement.herokuapp.com/payment";

class PaymentService {
    getPayment(){
        return axios.get(`${url}/list`);
    }
    savePayment(data){
        
        return axios.post(`${url}/save`,data)
    }

    //GET ONE BRANCH
    getPaymentId(id){
        return axios.get(`${url}/getOne/${id}`)
    }
    //  DELETE BRANCH
    deletePayment(id){
        return axios.delete(`${url}/delete/${id}`)
    }
}
export default new PaymentService ();
