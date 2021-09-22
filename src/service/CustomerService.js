import axios from 'axios'
const url = "http://localhost:8800/customer";
 class customerService {
     getCustomerList(){
         return axios.get(`${url}/list`)
     }
     saveCustomer(data){
         return axios.post(`${url}/save`,data)

     }
     getOneCustomer(id){
         return axios.get(`${url}/getOne/${id}`)
     }
     deleteCustomer(id){
        return axios.delete(`${url}/delete/${id}`)
    }
// customer with in loan
customer_inLoan(){
        return axios.get(`${url}/customerInLoan`)
    }
}
export default new customerService();