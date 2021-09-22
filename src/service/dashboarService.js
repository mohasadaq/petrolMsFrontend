import axios from "axios";
const url = "http://localhost:8800/transection";
class dashboardService {
  getTotalMoney() {
    return axios.get(`${url}/total`);
  }

  //Number Of liters Sold
  getNumberOfLiteresSold() {
    return axios.get(`${url}/n_of_l_sold`);
  }

    //HOW MANY LITERS ARE REMAINING
    getNumOfLiterRemaining() {
      return axios.get(`${url}/ramaining`);
    }

 //Total expense 
 getTotalExpense() {
  return axios.get(`http://localhost:8800/expense/totalExpense`);
}
  
}
export default new dashboardService();
