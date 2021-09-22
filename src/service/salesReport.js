import axios from 'axios'
const url = "http://localhost:8800/transection";
class SalesReport  {
    getSalesReport(){
        return  axios.get(`${url}/salesReport`);
    }
   
}
export default new SalesReport();