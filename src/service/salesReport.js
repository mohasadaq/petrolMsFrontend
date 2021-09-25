import axios from 'axios'
const url = "https://petrolmanagement.herokuapp.com/transection";
class SalesReport  {
    getSalesReport(){
        return  axios.get(`${url}/salesReport`);
    }
   
}
export default new SalesReport();
